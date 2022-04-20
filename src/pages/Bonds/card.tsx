import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import { useSousApproveBurn } from 'hooks/useApprove'
import { useSousStakeBurn } from 'hooks/useStake'
import { useSousHarvestBurn } from 'hooks/useHarvest'
import { Flex, useModal } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool2 } from 'state/types'
import { Skeleton } from 'components/Skeleton'
import Ripples from 'react-ripples'
import styled from 'styled-components'
import { FaExternalLinkSquareAlt, FaHandHolding } from 'react-icons/fa'
import BondsContainer from 'components/layout/containers/bondsContainer'
import DepositModal from 'components/modals/bondModal'
import BondButton from 'components/layout/buttons/bondButton'
import ClaimButton from 'components/layout/buttons/claimButton'

const Typography = styled.p`s
    font-size: 16px;
    color: #CFCFCF;
    font-weight: 400;
    min-width: 70px;
    max-width: 70px;
`

const TypographySmall = styled.p`
  font-size: 14px;
  color: #9b9b9b;
  font-weight: 400;
  min-width: 60px;
  max-width: 60px;
  margin-top: 3px;
`

interface PoolWithApy extends Pool2 {
  apy: BigNumber
}

interface HarvestProps {
  pool2: PoolWithApy
}

const Bonds: React.FC<HarvestProps> = ({ pool2 }) => {
  const {
    sousId,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    apy,
    tokenDecimals,
    startBlock,
    endBlock,
    userData,
    stakingLimit,
  } = pool2

  const block = useBlock()
  const user = useWallet()
  const tokenAddress = useERC20(stakingTokenAddress)
  const allowance = new BigNumber(userData?.allowance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const earningsNo = earnings.toNumber()
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  // functions
  const { onApprove } = useSousApproveBurn(tokenAddress, sousId)
  const { onStake } = useSousStakeBurn(sousId)
  const { onReward } = useSousHarvestBurn(sousId)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  // bond token balance
  const bondTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const bondTokenBalanceNo = bondTokenBalance.toNumber()
  const bondTokenBalanceStr = bondTokenBalanceNo.toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })

  // bonded balance
  const bondedBalance = new BigNumber(userData?.stakedBalance || 0)
  const bondedBalanceNo = bondedBalance.toNumber()
  const bondedBalanceStr = getBalanceNumber(bondedBalance).toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  // misc
  const userHasBondedBalance = bondedBalance?.toNumber() > 0
  const needsApproval = !userHasBondedBalance && !allowance.toNumber()

  // to start
  const hasStarted = block > startBlock
  const hoursToStartNo = (startBlock - block) * 2 * 0.000277778
  const hoursToStartStr = hoursToStartNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 })

  // vesting period
  const hasEnded = block > endBlock
  const vesting =
    block > startBlock
      ? (endBlock - block) * 2 * 0.000277778 * 0.0416667
      : (endBlock - startBlock) * 2 * 0.000277778 * 0.0416667
  const vestingStr = vesting.toLocaleString('en-us', { maximumFractionDigits: 1 })

  // returns
  const roiNo = (apy && apy.div(365).times(vesting).minus(100)).toNumber()
  const fivePercentRoi = roiNo > 5
  const roiStr = roiNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const estRoiAfterSoldOutNo = (apy && apy.div(365).times(5).minus(95)).toNumber()
  const estRoiAfterSoldOutStr = estRoiAfterSoldOutNo.toLocaleString('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  // tvl
  const tbvNo = pool2.tvl && pool2.tvl.toNumber()
  const tbvStr = tbvNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })

  // rewards to claim
  const rewardsNo = getBalanceNumber(earnings, tokenDecimals)
  const rewardsStr = rewardsNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 })

  // bond modal
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && bondTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : bondTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  // approve tx
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <>
      {hasStarted ? (
        <BondsContainer>
          <Flex alignItems="center" justifyContent="space-between">
            {/* Bond */}
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/ust3.svg" width="35px" style={{ marginRight: '8px' }}>
                &nbsp;
              </object>
              <Flex flexDirection="column">
                <Typography style={{ color: 'white' }}>{tokenName}&nbsp;</Typography>
                <a
                  target="_blanK"
                  rel="noreferrer"
                  href={`https://app.sushi.com/swap?outputCurrency=${stakingTokenAddress}`}
                  className="nav-links"
                >
                  <TypographySmall>
                    Buy&nbsp;
                    <FaExternalLinkSquareAlt />
                  </TypographySmall>
                </a>
              </Flex>
            </Flex>
            {/* ROI */}
            {hasEnded ? (
              <Flex flexDirection="column">
                <Typography style={{ color: 'white' }}>vROI</Typography>
                <TypographySmall style={{ marginTop: '2px' }}>Ended</TypographySmall>
              </Flex>
            ) : (
              <>
                {fivePercentRoi ? (
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>vROI</Typography>
                    <TypographySmall>{roiStr}%</TypographySmall>
                  </Flex>
                ) : (
                  <Flex flexDirection="column">
                    {estRoiAfterSoldOutNo > 0 ? (
                      <>
                        <Typography style={{ color: 'white' }}>Return</Typography>
                        <TypographySmall style={{ color: '#6ccca5' }}>{estRoiAfterSoldOutStr}%</TypographySmall>
                      </>
                    ) : (
                      <>
                        <Typography style={{ color: 'white' }}>Return</Typography>
                        <TypographySmall style={{ color: '#B33F40' }}>{estRoiAfterSoldOutStr}%</TypographySmall>
                      </>
                    )}
                  </Flex>
                )}
              </>
            )}
            {hasEnded ? (
              <Flex flexDirection="column">
                <Typography style={{ color: 'white' }}>Vesting</Typography>
                <TypographySmall>Ended</TypographySmall>
              </Flex>
            ) : (
              <Flex flexDirection="column">
                <Typography style={{ color: 'white' }}>Vesting</Typography>
                <TypographySmall>{vestingStr}&nbsp;Days</TypographySmall>
              </Flex>
            )}
            <Flex flexDirection="column">
              <Typography style={{ color: 'white' }}>Bonded</Typography>
              <TypographySmall>${bondedBalanceStr}</TypographySmall>
            </Flex>
            <Flex>
              {hasEnded ? (
                <BondButton disabled style={{ opacity: '0.3', cursor: 'not-allowed' }}>
                  Ended
                </BondButton>
              ) : (
                <>
                  {fivePercentRoi ? (
                    <Flex>
                      {needsApproval ? (
                        <BondButton disabled={hasEnded} onClick={handleApprove}>
                          Enable
                        </BondButton>
                      ) : (
                        <BondButton disabled={hasEnded} onClick={onPresentDeposit}>
                          Bond
                        </BondButton>
                      )}
                    </Flex>
                  ) : (
                    <BondButton disabled style={{ opacity: '0.3', cursor: 'not-allowed' }}>
                      Sold Out
                    </BondButton>
                  )}
                </>
              )}
              {rewardsNo > 0 ? (
                <Ripples>
                  <ClaimButton
                    style={{ marginLeft: '5px' }}
                    onClick={async () => {
                      setPendingTx(true)
                      await onReward()
                      setPendingTx(false)
                    }}
                  >
                    <FaHandHolding style={{ color: '#9B9B9B' }} />
                  </ClaimButton>
                </Ripples>
              ) : (
                <ClaimButton style={{ marginLeft: '5px', opacity: '0.3', cursor: 'not-allowed' }} disabled>
                  <FaHandHolding style={{ color: '#9B9B9B' }} />
                </ClaimButton>
              )}
            </Flex>
          </Flex>
        </BondsContainer>
      ) : (
        <>
          {hoursToStartNo < 100 ? (
            <BondsContainer>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  <object type="image/svg+xml" data="/images/ust3.svg" width="35px" style={{ marginRight: '8px' }}>
                    &nbsp;
                  </object>
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>{tokenName}&nbsp;</Typography>
                    <a
                      target="_blanK"
                      rel="noreferrer"
                      href={`https://app.sushi.com/swap?outputCurrency=${stakingTokenAddress}`}
                      className="nav-links"
                    >
                      <TypographySmall>
                        Buy&nbsp;
                        <FaExternalLinkSquareAlt />
                      </TypographySmall>
                    </a>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white', maxWidth: '100px' }}>Starting In</Typography>
                  <TypographySmall style={{ maxWidth: '100px' }}>{hoursToStartStr} Hours</TypographySmall>
                </Flex>
              </Flex>
            </BondsContainer>
          ) : (
            <Skeleton height="40px" marginTop="10px" />
          )}
        </>
      )}
    </>
  )
}

export default Bonds
