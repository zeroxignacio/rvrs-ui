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
import { Pool } from 'state/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import Skeleton from 'components/Skeleton/Skeleton'
import Typography from 'components/layout/typography/typography'
import { Flex } from 'components/layout/flex'
import Ripples from 'react-ripples'
import TypographyBold from 'components/layout/typography/typographyBold'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TitleCard from 'components/layout/cards/TitleCard'
import ContentCard from 'components/layout/cards/ContentCard'
import ContentCardAlt from 'components/layout/cards/ContentCardAlt'
import WithdrawModal from 'components/modals/withdrawModal'
import Wrap from 'components/layout/containers/Wrap'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import { usePriceCakeBusd } from "../../state/hooks";
import StakeModal from '../../components/modals/stakeModal'

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
      // user rejected tx or didn't go through
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
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>RVRS Staking&nbsp;</TypographyTitle>
            <a target="_blanK" rel="noreferrer" href="https://medium.com/@reverseprotocolONE/diamond-hands-through-vervrs-46dad3106d3" className="nav-links">
              (<TypographyTitle style={{ borderBottom: '1px dotted #FFFF' }}>Migrating</TypographyTitle>)
            </a>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px' }}>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>${tvlStr}</TypographyBold>
                :
                <Skeleton marginBottom="5px" />
              }
              <Typography>Total Staked</Typography>
            </ContentCard>
            <ContentCard>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{apyStr}%</TypographyBold>
                :
                <Skeleton marginBottom="5px" />
              }
              <Typography>Annual Yield</Typography>
            </ContentCard>
            <ContentCard style={{ marginLeft: '10px' }}>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{monthlyRoiStr}%</TypographyBold>
                :
                <Skeleton marginBottom="5px" />
              }
              <Typography>Monthly ROI</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center">
            <ContentCardAlt>
              {pool.apy ?
                <TypographyBold style={{ marginBottom: '5px' }}>{stakedStr} (${stakedUsdStr})</TypographyBold>
                :
                <Skeleton marginBottom="5px" />
              }
              <Typography>Staked RVRS</Typography>
            </ContentCardAlt>
          </Flex>
          <Divider />
          {needsApproval ?
            <ActionButton
              disabled={requestedApproval}
              onClick={handleApprove}>
              Enable Staking
            </ActionButton>
            :
            <Flex justifyContent="end">
              {stakedNo > 0 ?
                <>
                  <ActionButton
                    style={{ marginRight: '10px' }}
                    disabled={pendingTx}
                    onClick={onPresentWithdraw}>
                    Unstake
                  </ActionButton>
                  <ActionButton
                    disabled={apyNull}
                    onClick={onPresentDeposit}>
                    Stake {rvrsBalanceStr} RVRS
                  </ActionButton>
                </>
                :
                <>
                  <ActionButton
                    style={{ marginRight: '10px' }}
                    disabled>
                    Unstake
                  </ActionButton>
                  <ActionButton
                    disabled={apyNull}
                    onClick={onPresentDeposit}>
                    &nbsp;Stake&nbsp;
                  </ActionButton>
                </>
              }
            </Flex>
          }
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Typography>Stakers mint RVRS and gain Governance power over time. This form of staking is being deprecated with the introduction of veRVRS.</Typography>
        </LayoutContainer>
      </Wrap>
    </>
  )
}

const ActionButton = styled.button`
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
  margin-top: 20px;
`

export default Card
