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
import Wrap from 'components/layout/containers/Wrap'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
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
  const staked = new BigNumber(userData?.stakedBalance || 0)

  const stakedUsdStr = new BigNumber(getBalanceNumber(staked))
    .times(rvrsPrice)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const stakedNo = getBalanceNumber(staked)
  const stakedStr = stakedNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

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

    const rewBlock = new BigNumber(0.046).times(1e18).toNumber()

  // approve, withdraw modals
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={staked} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )
  const [onPresentDeposit] = useModal(
    <StakeModal max={stakingTokenBalance} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const notifySuccess = () =>
    toast.success('Success!', {
      position: 'top-left',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  const notifyPending = () =>
    toast.info('Confirm transaction...', {
      position: 'top-left',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    const Staked = ()=> new BigNumber(userData?.stakedBalance || 0) 
    
  return (
    <>
    {Staked}
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>RVRS Staking</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <Tippy content="The USD value of all RVRS staked in the protocol">
              <ContentCard style={{ marginRight: '10px' }}>
                {pool.apy ? (
                  <TypographyBold style={{ marginBottom: '5px' }}>${tvlStr}</TypographyBold>
                ) : (
                  <Skeleton marginBottom="5px" />
                )}
                <Typography>Total Staked</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="The expected percentage yield (compound interest) of staking RVRS for a year">
              <ContentCard>
                {pool.apy ? (
                  <TypographyBold style={{ marginBottom: '5px' }}>{apyStr}%</TypographyBold>
                ) : (
                  <Skeleton marginBottom="5px" />
                )}
                <Typography>Annual Yield</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="The monthly (non-compounded) percentage yield of staking RVRS">
              <ContentCard style={{ marginLeft: '10px' }}>
                {pool.apy ? (
                  <TypographyBold style={{ marginBottom: '5px' }}>{monthlyRoiStr}%</TypographyBold>
                ) : (
                  <Skeleton marginBottom="5px" />
                )}
                <Typography>Monthly Yield</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="0px">
            <Tippy content="Your expected RVRS interest after staking for a year based on current rates">
              <ContentCardAlt style={{ marginRight: '5px' }}>
                <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5', fontWeight: '500' }}>
                  +{roiYearStr} RVRS
                </TypographyBold>
                <Typography>Expected Yearly Interest</Typography>
              </ContentCardAlt>
            </Tippy>
            <Tippy content="Your expected RVRS interest after staking for a month based on current rates">
              <ContentCardAlt>
                <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5', fontWeight: '500' }}>
                  +{roiMonthStr} RVRS
                </TypographyBold>
                <Typography>Expected Monthly Interest</Typography>
              </ContentCardAlt>
            </Tippy>
          </Flex>
          {needsApproval ? (
            <Flex justifyContent="end" style={{ marginTop: '20px' }}>
              <Ripples>
                <ActionButton
                  onClick={async () => {
                    notifyPending()
                    setRequestedApproval(true)
                    await onApprove()
                    setRequestedApproval(false)
                    notifySuccess()
                  }}
                >
                  <ToastContainer
                    position="top-left"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  Enable Staking
                </ActionButton>
              </Ripples>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="space-between" style={{ marginTop: '20px' }}>
              <div>
                <Tippy content="Your current staked balance">
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
                      Unstake
                    </ActionButton>
                  </Ripples>
                  <Ripples>
                    <ActionButton disabled={apyNull} onClick={onPresentDeposit}>
                      Stake {rvrsBalanceStr} RVRS
                    </ActionButton>
                  </Ripples>
                </div>
              ) : (
                <div>
                  <ActionButton style={{ marginRight: '10px', opacity: '0.3', cursor: 'not-allowed' }} disabled>
                    Unstake
                  </ActionButton>
                  <Ripples>
                    <ActionButton disabled={apyNull} onClick={onPresentDeposit}>
                      &nbsp;Stake {rvrsBalanceStr} RVRS
                    </ActionButton>
                  </Ripples>
                </div>
              )}
            </Flex>
          )}
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Typography style={{ lineHeight: '1.1'}}>
            Stakers mint RVRS and gain Governance power over time. This form of staking is being deprecated with the introduction of (ve)RVRS.
          </Typography>
        </LayoutContainer>
      </Wrap>
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

// eslint-disable-next-line import/prefer-default-export
export { Card }
