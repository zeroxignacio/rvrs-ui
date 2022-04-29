import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'
import { usePriceCakeBusd } from '../../state/hooks'
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
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const rvrsBalanceStr = rvrsBalance.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const rvrsPrice = usePriceCakeBusd()
  const stakingTokenContract = useERC20(stakingTokenAddress)

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
  const staked = new BigNumber(userData?.stakedBalance || 0)

  const stakedNo = getBalanceNumber(staked)
  const stakedStr = stakedNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const stakedUsdStr = new BigNumber(stakedNo)
    .times(rvrsPrice)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  // misc
  const accountHasStakedBalance = staked?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber()

  // tvl
  const tvlNo = pool.tvl && pool.tvl.toNumber()
  const tvlStr = tvlNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })

  // apy
  const apyNo = apy && apy.toNumber()
  const apyNull = apyNo < 5
  const apyStr = apy && apy.toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const monthlyRoiStr = apr
    .div(12)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const roiYearStr = new BigNumber(apy)
    .times(stakedNo)
    .times(0.01)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const roiMonthStr = apr
    .div(12)
    .times(stakedNo)
    .times(0.01)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={staked} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )
  const [onPresentDeposit] = useModal(
    <StakeModal max={stakingTokenBalance} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  return (
    <>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>
              RVRS Staking
            </TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <Tippy content="The USD value of all RVRS staked in the deprecated staking contract">
              <ContentCard style={{ marginRight: '10px' }}>
                <TypographyBold style={{ marginBottom: '5px' }}>${tvlStr}</TypographyBold>
                <Typography>Deposited</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="N/A">
              <ContentCard>
                <TypographyBold style={{ marginBottom: '5px' }}>0%</TypographyBold>
                <Typography>Annual Yield</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="N/A">
              <ContentCard style={{ marginLeft: '10px' }}>
                <TypographyBold style={{ marginBottom: '5px' }}>0%</TypographyBold>
                <Typography>Monthly Yield</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="0px">
            <Tippy content="N/A">
              <ContentCardAlt style={{ marginRight: '5px' }}>
                <TypographyBold style={{ marginBottom: '5px', color: '#b33f40', fontWeight: '500' }}>
                  +0 RVRS
                </TypographyBold>
                <Typography>Expected Yearly Interest</Typography>
              </ContentCardAlt>
            </Tippy>
            <Tippy content="N/A">
              <ContentCardAlt>
                <TypographyBold style={{ marginBottom: '5px', color: '#b33f40', fontWeight: '500' }}>
                  +0 RVRS
                </TypographyBold>
                <Typography>Expected Monthly Interest</Typography>
              </ContentCardAlt>
            </Tippy>
          </Flex>
          {needsApproval ? (
            <div>&nbsp;</div>
          ) : (
            <Flex alignItems="center" justifyContent="space-between" style={{ marginTop: '20px' }}>
              <div>
                <Tippy content={`Your deposited balance, currently valued at $${stakedUsdStr}. Please migrate your stake now.`}>
                  <ContentCardAlt>
                    <TypographyBold>
                      {stakedStr}&nbsp;<Typography>RVRS Staked</Typography>
                    </TypographyBold>
                  </ContentCardAlt>
                </Tippy>
              </div>
              {stakedNo > 0 ? (
                <div style={{ justifyContent: 'space-between' }}>
                  <Ripples>
                    <ActionButton style={{ marginRight: '10px' }} onClick={onPresentWithdraw}>
                      Unstake All
                    </ActionButton>
                  </Ripples>
                  <Ripples>
                    <ActionButtonDisabled style={{ opacity: '0.3', cursor: 'not-allowed' }} disabled>
                      Stake {rvrsBalanceStr} RVRS
                    </ActionButtonDisabled>
                  </Ripples>
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
            </Flex>
          )}
        </LayoutContainer>
      </Wrap>
      <WrapWarning style={{ marginTop: '20px', backgroundColor:'#b33f40;'}}>
        <LayoutContainer style={{borderColor:'#b33f40'}}>
          <Typography style={{ lineHeight: '1.1' }}>
            This form of staking is now deprecated with the introduction of (ve)RVRS. Please migrate your funds to the
            supported contract.
          </Typography>
        </LayoutContainer>
      </WrapWarning>
      <ToastContainer
        position="top-left"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  )
}

const ActionButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  background: transparent;
  color: #eeeeee;
  border-left: 5px solid #6699a3;
  padding: 10px;
  transition: 0.3s ease-in-out;
  :hover {
    opacity: 0.5;
    background: transparent;
  }
`

const ActionButtonDisabled = styled.button`
  font-size: 16px;
  font-weight: 400;
  background: transparent;
  color: #eeeeee;
  border-left: 5px solid #b33f40;
  padding: 10px;
  transition: 0.3s ease-in-out;
  :hover {
    opacity: 0.5;
    background: transparent;
  }
`

const Wrap = styled(Container)`
    border-radius: 7px;
    padding: 2px;
    border-width: 1px;
    border-color: #3A3A3A;
    border-style: solid;
    box-shadow: 5px 5px 25px -15px #55747d;
    transition: all 0.3s ease-in-out;
`

const WrapWarning = styled(Container)`
    border-radius: 7px;
    padding: 2px;
    border-width: 1px;
    border-color: #b33f40;
    border-style: solid;
    box-shadow: 5px 5px 25px -15px #b33f40;
    transition: all 0.3s ease-in-out;
`

// eslint-disable-next-line import/prefer-default-export
export { Card }
