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
import useBlock from 'hooks/useBlock'
import { FaQuestionCircle } from 'react-icons/fa'
import GradientCard from 'components/layout/cards/GradientCard'
import ContentCardAlt from 'components/layout/cards/ContentCardAlt'
import Tippy from '@tippyjs/react'
import StakeModal from '../../components/modals/stakeModal'
import { useFarmFromPid, usePriceCakeBusd } from '../../state/hooks'

type PoolWithApy = Pool

interface HarvestProps {
  pool: PoolWithApy
}

const Card: React.FC<HarvestProps> = ({ pool }) => {
  const { sousId, stakingTokenName, userData, veRvrsPublicData, veRvrsUserData } = pool
  const stakingTokenContract = useERC20('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade')
  const rvrsPrice = usePriceCakeBusd()
  const farm0 = useFarmFromPid(0)
  const rvrsPerBlock = new BigNumber(farm0.vikingPerBlock)
  const block = useBlock()
  const { account } = useWallet()

  const { onApprove } = useVeRvrsApprove(stakingTokenContract, sousId)
  const { onStake } = useVeRvrsStake(sousId, false)
  const { onUnstake } = useVeRvrsUnstake(sousId)
  const { onReward } = useVeRvrsClaim(sousId)
  const [pendingTx, setPendingTx] = useState(false)

  const hasAllowance = new BigNumber(veRvrsUserData?.allowance).toNumber() > 0

  const rvrsBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const veRvrsBalance = new BigNumber(veRvrsUserData?.veRvrsBalance || 0).div(1e18)

  const stakedRvrs = new BigNumber(veRvrsUserData?.rvrsStaked || 0).div(1e18)
  const stakedRvrsUsd = stakedRvrs.times(rvrsPrice)

  const pendingRvrs = new BigNumber(veRvrsUserData?.pendingRvrs || 0)
  const pendingVeRvrs = new BigNumber(veRvrsUserData?.pendingVeRvrs || 0)

  const totalRvrsStaked = new BigNumber(veRvrsPublicData?.totalStaked || 0)
  const veRvrsSupply = new BigNumber(veRvrsPublicData?.totalSupply || 0)
  const protocolShare = (veRvrsBalance.div(veRvrsSupply.div(1e18))).times(100)

  const baseAprRatio = 0.6666
  const boostedAprRatio = 0.3333
  const tvl = totalRvrsStaked.times(rvrsPrice)
  const totalRvrsPerYearUsd = rvrsPerBlock.times(BLOCKS_PER_YEAR).times(2).times(rvrsPrice) // times(2) because reverse masterchef mints per second, not block
  const baseApr = totalRvrsPerYearUsd.div(tvl).times(100).times(baseAprRatio)
  const boostedEarnings = (veRvrsBalance.div(veRvrsSupply)).times(totalRvrsPerYearUsd).times(boostedAprRatio) // gets the amount of usd a user will get in boosted rewards in a year
  const boostedApr = boostedEarnings.div(stakedRvrsUsd).times(100) // calculates the % of what is earned relative to the usd value of a users stake
  const totalApr = baseApr.plus(boostedApr)
  // const netApy = new BigNumber(totalApr).div(100).div(365).plus(1).pow(365).minus(1).times(100)


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
            <TypographyTitle>Stake RVRS to Earn veRVRS</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                {baseApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
              </TypographyBold>
              <Typography>Base APR</Typography>
            </ContentCard>
            <GradientCard style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                {totalApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
              </TypographyBold>
              <Typography>
                Total APR
                <FaQuestionCircle style={{ maxWidth: '10px', paddingBottom: '5px', marginLeft: '3px' }} color="grey" />
              </Typography>
            </GradientCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                {boostedApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
              </TypographyBold>
              <Typography>Boosted APR</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginBottom="0px">
            <ContentCardAlt style={{ marginRight: '10px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>{protocolShare.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%</TypographyBold>
              <Typography>Protocol Share</Typography>
            </ContentCardAlt>
            <ContentCardAlt style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                {veRvrsBalance.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
              </TypographyBold>
              <Typography>veRVRS</Typography>
            </ContentCardAlt>
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
                  Enable Staking
                </ActionButton>
              </Ripples>
            </Flex>
          ) : (
            <>
              <Flex alignItems="center" justifyContent="space-between" style={{ marginTop: '20px' }}>
                <div>
                  <ContentCardAlt>
                    <TypographyBold>
                      {stakedRvrs.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}&nbsp;<Typography>RVRS Staked</Typography>
                    </TypographyBold>
                  </ContentCardAlt>
                </div>
                <div style={{ justifyContent: 'space-between' }}>
                  <Ripples>
                    <StakeUnstakeButton disabled style={{ marginRight: '10px' }}>
                      <Flex>
                        <ActionTypography style={{ marginRight: '10px' }} onClick={onPresentDeposit}>
                          Stake
                        </ActionTypography>
                        <Typography style={{ marginRight: '10px' }} onClick={onPresentDeposit}>
                          |
                        </Typography>
                        <ActionTypography onClick={onPresentWithdraw}>Unstake</ActionTypography>
                      </Flex>
                    </StakeUnstakeButton>
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
                      Claim
                    </ActionButton>
                  </Ripples>
                </div>
              </Flex>
            </>
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

const StakeUnstakeButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  background: transparent;
  color: #eeeeee;
  border-left: 5px solid #6699a3;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.3s ease-in-out;
  :hover {
    background: transparent;
  }
`

const ActionTypography = styled.p`
  font-size: 16px;
  color: white;
  font-weight: 400;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`

const Divider = styled.div`
  background-color: #515151;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`

const TypographyAccent = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: #6699a3;
  align-items: center;
  display: inline-flex;
  text-shadow: 0px 0px 15px #6699a3;
`

// eslint-disable-next-line import/prefer-default-export
export { Card }
