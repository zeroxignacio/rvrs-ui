import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useModal } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken } from 'config/constants/types'
import StakeContainer from 'components/layout/containers/airdropContainer'
import { Pool } from 'state/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import Skeleton from 'components/Skeleton/Skeleton'
import Typography from 'components/layout/typography/typography'
import { Flex } from 'components/layout/flex'
import TypographyBold from 'components/layout/typography/typographyBold'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import WithdrawModal from 'components/modals/withdrawModal'
import StakeModal from '../../components/modals/stakeModal'
import { usePriceCakeBusd } from "../../state/hooks";
import ContentCard from './containers/contentCard'
import ContentCard2 from './containers/contentCard2'
import ContentCardMain from './containers/contentCardMain'
import TitleCard from './containers/titleCard'

interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const Card: React.FC<HarvestProps> = ({ pool }) => {
  const { sousId, stakingTokenName, stakingTokenAddress, apy, userData, pricePerShare, apr } = pool

  // rvrs
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress()));
  const rvrsBalanceStr = rvrsBalance.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const rvrsPrice = usePriceCakeBusd()
  const stakingTokenContract = useERC20(stakingTokenAddress)

  // func
  const { account } = useWallet()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId)
  const { onUnstake } = useSousUnstake(sousId)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP

  // staked
  const staked = new BigNumber(userData?.stakedBalance || 0);
  const stakedUsdStr = new BigNumber(getBalanceNumber(staked)).times(rvrsPrice).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const stakedNo = getBalanceNumber(staked);
  const stakedStr = stakedNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  // misc
  const accountHasStakedBalance = staked?.toNumber() > 0;
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber();

  // tvl
  const tvlNo = pool.tvl && pool.tvl.toNumber();
  const tvlStr = tvlNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 });

  // apy
  const apyNo = apy && apy.toNumber();
  const apyNull = apyNo < 5;
  const apyStr = apy && apy.toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const monthlyRoiStr = apr && apr.div(12).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  // approve, withdraw, deposit
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={staked} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])
  const [onPresentDeposit] = useModal(
    <StakeModal
      max={stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingTokenName}
    />,
  )

  return (
    <>
      <StakeContainerWrap>
        <StakeContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>RVRS Staking&nbsp;</TypographyTitle>
            <a target="_blanK" rel="noreferrer" href="https://medium.com/@reverseprotocolONE/diamond-hands-through-vervrs-46dad3106d3" className="nav-links">
              (<TypographyTitle style={{ borderBottom: '1px dotted #FFFF' }}>Soon Deprecated</TypographyTitle>)
            </a>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px' }}>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>${tvlStr}</TypographyBold>
                :
                <Typography><Skeleton height={10} width={60} marginBottom="5px" /></Typography>
              }
              <Typography>TVL</Typography>
            </ContentCard>
            <ContentCardMain>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{apyStr}%</TypographyBold>
                :
                <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
              }
              <Typography>Annual Yield</Typography>
            </ContentCardMain>
            <ContentCard style={{ marginLeft: '10px' }}>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{monthlyRoiStr}%</TypographyBold>
                :
                <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
              }
              <Typography>Monthly ROI</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center">
            <ContentCard2 style={{ marginRight: '10px' }}>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{stakedStr}</TypographyBold>
                :
                <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
              }
              <Typography>Staked RVRS</Typography>
            </ContentCard2>
            <ContentCard2>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>${stakedUsdStr}</TypographyBold>
                :
                <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
              }
              <Typography>Staked (USD)</Typography>
            </ContentCard2>
          </Flex>
          <Divider />
          
          {account && (!needsApproval ? (
            <Flex justifyContent="end" marginTop="0px" marginBottom="0px">
              {stakedNo > 0 ?
                <>
                  <UnstakeButton
                    style={{ marginRight: "10px" }}
                    disabled={staked.eq(new BigNumber(0)) || pendingTx}
                    onClick={isOldSyrup ? async () => {
                      setPendingTx(true)
                      await onUnstake('0')
                      setPendingTx(false)
                    } : onPresentWithdraw}>
                    Unstake
                  </UnstakeButton>
                  <StakeButton
                    disabled={apyNull}
                    onClick={onPresentDeposit}>
                    &nbsp;Stake&nbsp;
                  </StakeButton>
                </>
                :
                <>
                  <UnstakeButton
                    style={{ marginRight: "10px" }}
                    disabled
                    onClick={isOldSyrup ? async () => {
                      setPendingTx(true)
                      await onUnstake('0')
                      setPendingTx(false)
                    } : onPresentWithdraw}>
                    Unstake
                  </UnstakeButton>
                  <StakeButton
                    disabled={apyNull}
                    onClick={onPresentDeposit}
                  >
                    &nbsp;Stake&nbsp;
                  </StakeButton>
                </>
              }
            </Flex>
          ) : (
            <StakeButton
              style={{ marginTop: "0px", marginBottom: "0px" }}
              disabled={requestedApproval}
              onClick={handleApprove}>
              Enable
            </StakeButton>
          ))}
        </StakeContainer>
      </StakeContainerWrap>


      <StakeContainerWrap style={{ marginTop: '20px' }}>
          <StakeContainer style={{ padding: '15px' }}>
            <Flex justifyContent="center">
              <Typography>Stakers mint RVRS and expand its supply. This form of staking is being deprecated with the introduction of veRVRS.</Typography>
            </Flex>
          </StakeContainer>
        </StakeContainerWrap>
    </>
  )
}


const StakeContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 2px;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
`


const StakeButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  background: transparent;
  color: #EEEEEE;
  min-width: 90px;
  border-left: 5px solid #;
  justify-content: center;
  padding: 10px;
  transition: 0.5s ease-in-out;
  :hover {
      opacity: 0.5;
      background: transparent;
  } 
`

const UnstakeButton = styled.button`
font-size: 16px;
font-weight: 400;
background: transparent;
color: #EEEEEE;
min-width: 90px;
border-left: 5px solid #;
justify-content: center;
padding: 10px;
transition: 0.5s ease-in-out;
:hover {
    opacity: 0.5;
    background: transparent;
} 
`

const Divider = styled.div`
  background-color: #9B9B9B;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 0%;
`

export default Card
