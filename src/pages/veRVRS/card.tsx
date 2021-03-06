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
import { Container } from 'react-bootstrap'
import Typography from 'components/layout/typography/typography'
import { Flex } from 'components/layout/flex'
import Ripples from 'react-ripples'
import TypographyBold from 'components/layout/typography/typographyBold'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TitleCard from 'components/layout/cards/TitleCard'
import ContentCard from 'components/layout/cards/ContentCard'
import WithdrawModal from 'components/modals/withdrawModalVe'
import 'react-toastify/dist/ReactToastify.css'
import Wrap from 'components/layout/containers/Wrap'
import 'tippy.js/dist/tippy.css'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'
import { useVeRvrsClaim } from 'hooks/useHarvest'
import { BLOCKS_PER_YEAR } from 'config'
import useBlock from 'hooks/useBlock'
import { FaExternalLinkAlt, FaExternalLinkSquareAlt, FaQuestionCircle, FaRegQuestionCircle } from 'react-icons/fa'
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
  const rvrsBalanceBn = new BigNumber(userData?.stakingTokenBalance || 0)
  const rvrsBalance = new BigNumber(userData?.stakingTokenBalance || 0).div(1e18)
  const veRvrsBalance = new BigNumber(veRvrsUserData?.veRvrsBalance || 0).div(1e18)
  const stakedRvrs = new BigNumber(veRvrsUserData?.rvrsStaked || 0).div(1e18)
  const stakedRvrsBn = new BigNumber(veRvrsUserData?.rvrsStaked || 0)

  const stakedRvrsUsd = stakedRvrs.times(rvrsPrice)
  const pendingRvrs = new BigNumber(veRvrsUserData?.pendingRvrs || 0)
  const pendingVeRvrs = new BigNumber(veRvrsUserData?.pendingVeRvrs || 0)

  const hasStaked = stakedRvrsBn.toNumber() > 0
  
  const totalRvrsStaked = new BigNumber(veRvrsPublicData?.totalStaked || 0)
  const veRvrsSupply = new BigNumber(veRvrsPublicData?.totalSupply || 0)
  const protocolShare = veRvrsBalance.div(veRvrsSupply.div(1e18)).times(100)
  const userVeRvrsCap = stakedRvrs.times(new BigNumber(veRvrsPublicData?.maxCap || 0))
  const baseAprRatio = 0.6666
  const boostedAprRatio = 0.3333
  const tvl = totalRvrsStaked.times(rvrsPrice)
  const totalRvrsPerYearUsd = rvrsPerBlock.times(BLOCKS_PER_YEAR).times(2).times(rvrsPrice) // times(2) because reverse masterchef mints per second, not block
  const baseApr = totalRvrsPerYearUsd.div(tvl).times(100).times(baseAprRatio)
  const boostedEarnings = veRvrsBalance.div(veRvrsSupply).times(totalRvrsPerYearUsd).times(boostedAprRatio) // gets the amount of usd a user will get in boosted rewards in a year
  const boostedApr = boostedEarnings.div(stakedRvrsUsd).times(100) // calculates the % of what is earned relative to the usd value of a users stake
  const totalApr = baseApr.plus(boostedApr)
  const monthlyInterest = totalApr.div(12).times(0.01).times(stakedRvrs)
  // const netApy = new BigNumber(totalApr).div(100).div(365).plus(1).pow(365).minus(1).times(100)

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedRvrsBn} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )
  const [onPresentDeposit] = useModal(
    <StakeModal max={rvrsBalanceBn} onConfirm={onStake} tokenName={stakingTokenName} />,
  )
  const [requestedApproval, setRequestedApproval] = useState(false)

  return (
    <>
      <StyledWrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>Stake RVRS to Earn veRVRS</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px', padding: '16px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                {baseApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
              </TypographyBold>
              <Typography>Base APR</Typography>
            </ContentCard>
            <GradientCard style={{ marginRight: '10px', padding: '16px' }}>
              {boostedApr.toNumber() > 0 ? (
                <TypographyBold style={{ marginBottom: '5px' }}>
                  {totalApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
                </TypographyBold>
              ) : (
                <TypographyBold style={{ marginBottom: '5px' }}>
                  {baseApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
                </TypographyBold>
              )}
              <Typography>Total APR</Typography>
            </GradientCard>
            <ContentCard style={{ marginRight: '0px', padding: '16px' }}>
              {boostedApr.toNumber() > 0 ? (
                <TypographyBold style={{ marginBottom: '5px' }}>
                  {boostedApr.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}%
                </TypographyBold>
              ) : (
                <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
              )}
              <Flex justifyContent="center" alignItems="center">
                <Typography>Boosted APR</Typography>
                <Tippy content="The more veRVRS you hold, the higher your boosted APR will be! Make sure to come back and claim every day.">
                  <div>
                    <FaRegQuestionCircle
                      style={{ maxWidth: '10px', cursor: 'pointer', marginLeft: '2px' }}
                      color="grey"
                    />
                  </div>
                </Tippy>
              </Flex>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginBottom="0px">
            <ContentCardAlt style={{ padding: '15px' }}>
              <Flex justifyContent="space-between" alignItems="center">
                <Typography>My Balance</Typography>
                <Flex alignItems="center" justifyContent="center">
                  <img
                    width="0px"
                    style={{ marginRight: '2px', marginBottom: '0px' }}
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/images/vervrs.svg`}
                    alt="logo"
                  />
                  <TypographyAccent>
                    <ActivePulse style={{ marginRight: '5px' }} />
                    {veRvrsBalance
                      .toNumber()
                      .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <TypographySmall style={{ marginTop: '4px' }}>&nbsp;veRVRS</TypographySmall>
                  </TypographyAccent>
                </Flex>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between" alignItems="center">
                <Flex justifyContent="space-between" alignItems="center">
                  <TypographySmall>
                    veRVRS Supply:&nbsp;
                    {veRvrsSupply.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2 })}
                  </TypographySmall>
                  <Tippy content="The current supply of veRVRS">
                    <div>
                      <FaRegQuestionCircle
                        style={{ maxWidth: '10px', cursor: 'pointer', marginLeft: '2px' }}
                        color="grey"
                      />
                    </div>
                  </Tippy>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <TypographySmall>
                    Your veRVRS Cap:&nbsp;
                    {userVeRvrsCap.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                  </TypographySmall>
                  <Tippy content="The maximum amount of veRVRS you can accumulate based on your current RVRS staked">
                    <div>
                      <FaRegQuestionCircle
                        style={{ maxWidth: '10px', cursor: 'pointer', marginLeft: '2px' }}
                        color="grey"
                      />
                    </div>
                  </Tippy>
                </Flex>
              </Flex>
            </ContentCardAlt>
          </Flex>
          <Flex justifyContent="center">
            <ContentCardAlt style={{ marginTop: '10px', marginRight: '10px' }}>
              <Typography style={{ marginBottom: '5px' }}>
                {stakedRvrs.toNumber().toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
              <Flex justifyContent="center" alignItems="center">
                <TypographySmall>Your Stake</TypographySmall>
                <Tippy
                  content={`Your staked balance is currently valued at $${stakedRvrs
                    .times(rvrsPrice)
                    .toNumber()
                    .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                `}
                >
                  <div>
                    <FaRegQuestionCircle
                      style={{ maxWidth: '10px', cursor: 'pointer', marginLeft: '2px' }}
                      color="grey"
                    />
                  </div>
                </Tippy>
              </Flex>
            </ContentCardAlt>
            <ContentCardAlt style={{ marginTop: '10px', marginRight: '10px' }}>
              <Typography style={{ marginBottom: '5px', color: '#6ccca5' }}>
                +
                {monthlyInterest
                  .toNumber()
                  .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
              <TypographySmall>Monthly Interest</TypographySmall>
            </ContentCardAlt>
            <ContentCardAlt style={{ marginTop: '10px', marginRight: '0px' }}>
              <Typography style={{ marginBottom: '5px' }}>
                $
                {tvl
                  .div(1e18)
                  .toNumber()
                  .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
              <TypographySmall>Value Locked</TypographySmall>
            </ContentCardAlt>
          </Flex>
          {!hasAllowance ? (
            <Flex alignItems="center" justifyContent="space-between" style={{ marginTop: '20px' }}>
              <div>
                <ContentCardAlt>
                  <Flex alignItems="center" justifyContent="center">
                    <Typography>Need RVRS?&nbsp;</Typography>
                    <a
                      target="_blanK"
                      rel="noreferrer"
                      href="https://app.sushi.com/swap?outputCurrency=0x53Ad1f6eA77b4Fb9c44d27eBdef0510Eafd2760a"
                      className="nav-links"
                    >
                      <TypographyBold style={{ fontSize: '15px' }}>Get Some&nbsp;</TypographyBold>
                    </a>
                  </Flex>
                </ContentCardAlt>
              </div>
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
            </Flex>
          ) : (
            <>
              <Flex alignItems="center" justifyContent="space-between" style={{ marginTop: '20px' }}>
                <div>
                  {hasStaked ? (
                    <ContentCardAlt2>
                      <Flex alignItems="center" justifyContent="center">
                        <ClaimButton
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
                          Claim All
                        </ClaimButton>
                        &nbsp;
                        <TypographySmall>
                          <p style={{ justifyContent: 'left' }}>
                            RVRS:&nbsp;
                            {pendingRvrs
                              .div(1e18)
                              .toNumber()
                              .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <p style={{ justifyContent: 'left' }}>
                            veRVRS:&nbsp;
                            {pendingVeRvrs
                              .div(1e18)
                              .toNumber()
                              .toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </TypographySmall>
                      </Flex>
                    </ContentCardAlt2>
                  ) : (
                    <ContentCardAlt>
                      <Flex alignItems="center" justifyContent="center">
                        <Typography>Need RVRS?&nbsp;</Typography>
                        <a
                          target="_blanK"
                          rel="noreferrer"
                          href="https://app.sushi.com/swap?outputCurrency=0x53Ad1f6eA77b4Fb9c44d27eBdef0510Eafd2760a"
                          className="nav-links"
                        >
                          <TypographyBold style={{ fontSize: '15px' }}>Get Some&nbsp;</TypographyBold>
                        </a>
                      </Flex>
                    </ContentCardAlt>
                  )}
                </div>
                <div style={{ justifyContent: 'space-between' }}>
                  {hasStaked ? (
                    <Flex>
                      <StakeUnstakeButton style={{ marginRight: '10px' }} onClick={onPresentDeposit}>
                        Stake&nbsp;{rvrsBalance.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                        &nbsp;RVRS
                      </StakeUnstakeButton>
                      <StakeUnstakeButton onClick={onPresentWithdraw}>Unstake</StakeUnstakeButton>
                    </Flex>
                  ) : (
                    <ActionButton onClick={onPresentDeposit}>
                      Stake&nbsp;{rvrsBalance.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                      &nbsp;RVRS
                    </ActionButton>
                  )}
                </div>
              </Flex>
            </>
          )}
        </LayoutContainer>
      </StyledWrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Typography style={{ lineHeight: '1.1' }}>
            Stakers can boost their RVRS yields by accumulating veRVRS. On unstake, all veRVRS previously held will drop
            to 0. veRVRS is the governance token of the Reverse Protocol and UST airdrops will depend on your balance.
          </Typography>
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Typography style={{ lineHeight: '1.1' }}>
            DO NOT DEPOSIT RVRS TO THIS POOL. CONTRACTS WILL BE SWAPPED ON LAUNCH
          </Typography>
        </LayoutContainer>
      </Wrap>
    </>
  )
}

const ActionButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  background: transparent;
  color: #eeeeee;
  border-left: 5px solid #6699a3;
  padding: 10px;
  transition: 0.3s ease-in-out;
  box-shadow: 0 0 20px -8px #6699a3;

  :hover {
    opacity: 0.5;
    background: transparent;
  }
`

const ClaimButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  background: #6699a3;
  color: #eeeeee;
  padding: 8px;
  transition: 0.3s ease-in-out;
  boder-radius: 5px;
  box-shadow: 0 0 20px -8px #6699a3;
  :hover {
    opacity: 0.5;
    background: transparent;
  }
`

const ContentCardAlt2 = styled(Container)`
  text-align: center;
  border-radius: 0px;
  // padding: 8px;
  padding: 2px;
  border-width: 1px;
  border-color: #3a3a3a;
  border-style: solid;
  transition: all 0.2s ease-in-out;
  padding-right: 8px;
  :hover {
    border-color: #515151;
  }
`

const TypographySmall = styled.p`
  font-size: 12px;
  color: #9b9b9b;
  font-weight: 400;
`

const StakeUnstakeButton = styled.button`
  font-size: 15x;
  font-weight: 500;
  background: transparent;
  color: #eeeeee;
  border-left: 5px solid #6699a3;
  padding: 10px;
  transition: 0.3s ease-in-out;
  box-shadow: 0 0 17px -10px #6699a3;
  :hover {
    background: transparent;
    opacity: 0.5;
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

const pulse = keyframes`
  0% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 0.5px #6699a3;
  }
  100% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
`

const ActivePulse = styled.div`
  background: #6699a3;
  border-radius: 100%;
  margin: 0px;
  height: 6px;
  width: 6px;
  opacity: 0.5;
  box-shadow: #6ccca5;
  transform: scale(1);
  animation: ${pulse} 3s infinite;
`

const Divider = styled.div`
  background-color: #515151;
  height: 2px;
  margin-top: 10px;
  border-radius: 25px;
  margin-bottom: 8px;
  width: 100%;
`

const TypographyAccent = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #6699a3;
  align-items: center;
  display: inline-flex;
  text-shadow: 0px 0px 0px #6699a3;
`

const TypographyAccentAlt = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: white;
  align-items: center;
  display: inline-flex;
  text-shadow: 0px 0px 0px #6ccca5;
`

const StyledWrap = styled(Container)`
  border-radius: 7px;
  padding: 2px;
  border-width: 1px;
  border-color: #3a3a3a;
  border-style: solid;
  box-shadow: 0px 25px 25px -35px #55747d, 0px -25px 25px -35px #55747d;
  :hover {
    box-shadow: 25px 25px 40px -45px #55747d, -25px -25px 40px -45px #6699a3;
  }
  transition: all 0.3s ease-in-out;
`

// eslint-disable-next-line import/prefer-default-export
export { Card }
