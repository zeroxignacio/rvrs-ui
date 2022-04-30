import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useModal } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import { useVeRvrsApprove } from 'hooks/useApprove'
import { useVeRvrsStake } from 'hooks/useStake'
import { useVeRvrsUnstake } from 'hooks/useUnstake'
import { Pool } from 'state/types'
import Typography from 'components/layout/typography/typography'
import { Flex } from 'components/layout/flex'
import Ripples from 'react-ripples'
import TypographyBold from 'components/layout/typography/typographyBold'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TitleCard from 'components/layout/cards/TitleCard'
import ContentCard from 'components/layout/cards/ContentCard'
import WithdrawModal from 'components/modals/withdrawModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Wrap from 'components/layout/containers/Wrap'
import 'tippy.js/dist/tippy.css'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'
import { useVeRvrsClaim } from 'hooks/useHarvest'
import { BLOCKS_PER_YEAR } from 'config'
import StakeModal from '../../components/modals/stakeModal'
import { useFarmFromPid, usePriceCakeBusd } from '../../state/hooks'

interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const Card: React.FC<HarvestProps> = ({ pool }) => {
  const { sousId, stakingTokenName, userData, veRvrsPublicData, veRvrsUserData } = pool
  const stakingTokenContract = useERC20('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade')
  const rvrsPrice = usePriceCakeBusd()
  const { account } = useWallet() // user
  const { onApprove } = useVeRvrsApprove(stakingTokenContract, sousId) // approve
  const { onStake } = useVeRvrsStake(sousId, false) // stake
  const { onUnstake } = useVeRvrsUnstake(sousId) // unstake
  const { onReward } = useVeRvrsClaim(sousId) // claim
  const [pendingTx, setPendingTx] = useState(false)
  const hasAllowance = new BigNumber(veRvrsUserData?.allowance.toString()).toNumber() > 0
  const rvrsBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedRvrs = new BigNumber(veRvrsUserData?.rvrsStaked.toString() || 0)
  const stakedRvrsUsd = new BigNumber(veRvrsUserData?.rvrsStaked.toString() || 0).times(rvrsPrice)
  const stakedRvrsNo = stakedRvrs.div(1e18).toNumber()
  const stakedRvrsStr = stakedRvrsNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const totalRvrsStakedNo = new BigNumber(veRvrsPublicData?.totalStaked.toString() || 0).div(1e18).toNumber()
  const totalRvrsStakedStr = totalRvrsStakedNo.toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  const tvl = new BigNumber(veRvrsPublicData?.totalStaked.toString() || 0).div(1e18).times(rvrsPrice)
  const veRvrsSupply = 1
  // const veRvrsSupply = new BigNumber(pool.veRvrsPublicData.totalSupply.toString() || 0).div(1e18)
  // const generationRateNo = new BigNumber(veRvrsPublicData.generationRate.toString() || 0).div(1e18).toNumber()
  // const withdrawFeeTimeNo = new BigNumber(veRvrsPublicData.withdrawFeeTime.toString() || 0).div(1e18).toNumber()
  // const maxCapNo = new BigNumber(veRvrsPublicData.maxCap.toString() || 0).toNumber()
  const pendingRvrsNo = new BigNumber(veRvrsUserData?.pendingRvrs.toString() || 0).div(1e18).toNumber()
  const pendingVeRvrsNo = new BigNumber(veRvrsUserData?.pendingVeRvrs.toString() || 0).div(1e18).toNumber()
  const veRvrsBalance = new BigNumber(veRvrsUserData?.veRvrsBalance.toString() || 0).div(1e18)
  const farm0 = useFarmFromPid(0)
  const rvrsPerBlock = new BigNumber(farm0.vikingPerBlock)

  // const apr = new BigNumber()
  // const boostedApr =
  const totalRewardsPerYearUsd = rvrsPrice.times(rvrsPerBlock).div(1e18).times(BLOCKS_PER_YEAR)
  const apr = totalRewardsPerYearUsd.div(930000).times(100)
  const apy = new BigNumber(apr).div(100).div(365).plus(1).pow(365).minus(1).times(100)
  const apyStr = apy.toNumber().toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  // boosted apr calculation
  const boostedYearlyInterest = veRvrsBalance.div(veRvrsSupply).times(totalRewardsPerYearUsd)
  const boostedApr = boostedYearlyInterest.div(stakedRvrsUsd).times(100)
  const boostedAprStr = boostedApr.toNumber().toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedRvrs} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )
  const [onPresentDeposit] = useModal(<StakeModal max={rvrsBalance} onConfirm={onStake} tokenName={stakingTokenName} />)
  const [requestedApproval, setRequestedApproval] = useState(false)

  return (
    <>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>Stake RVRS to Earn veRVRS &gt;.&gt;</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Total Staked</TypographyBold>
              <Typography>{totalRvrsStakedStr}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>APY</TypographyBold>
              <Typography>{apyStr}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Boosted APR</TypographyBold>
              <Typography>{boostedAprStr}</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Staked RVRS</TypographyBold>
              <Typography>{stakedRvrsStr}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending veRVRS</TypographyBold>
              <Typography>{}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending RVRS</TypographyBold>
              <Typography>{}</Typography>
            </ContentCard>
          </Flex>
          {!hasAllowance ? (
            <Flex justifyContent="end" style={{ marginTop: '20px' }}>
              <Ripples>
                <ActionButton
                  onClick={async () => {
                    notifyPending()
                    try {
                      setRequestedApproval(true)
                      await onApprove()
                      setRequestedApproval(false)
                      notifySuccess()
                    } catch (e) {
                      notifyError()
                    }
                  }}
                >
                  Enable
                </ActionButton>
              </Ripples>
            </Flex>
          ) : (
            <Flex alignItems="center" style={{ marginTop: '20px' }} justifyContent="center">
              <Ripples>
                <ActionButton style={{ marginRight: '10px' }} onClick={onPresentWithdraw}>
                  Unstake
                </ActionButton>
              </Ripples>
              <Ripples>
                <ActionButton style={{ marginRight: '10px' }} onClick={onPresentDeposit}>
                  Stake
                </ActionButton>
              </Ripples>
              <Ripples>
                <ActionButton
                  onClick={async () => {
                    notifyPending()
                    try {
                      setPendingTx(true)
                      await onReward()
                      setPendingTx(false)
                      notifySuccess()
                    } catch (e) {
                      notifyError()
                    }
                  }}
                >
                  Claim veRVRS and RVRS
                </ActionButton>
              </Ripples>
            </Flex>
          )}
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Typography style={{ lineHeight: '1.1' }}>
            Do NOT deposit RVRS in this pool. It will lead to loss of funds.
          </Typography>
        </LayoutContainer>
      </Wrap>
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

// eslint-disable-next-line import/prefer-default-export
export { Card }
