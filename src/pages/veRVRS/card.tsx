import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useModal } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove, useVeRvrsApprove } from 'hooks/useApprove'
import { useSousStake, useVeRvrsStake } from 'hooks/useStake'
import { useSousUnstake, useVeRvrsUnstake } from 'hooks/useUnstake'
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
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'
import { useVeRvrsClaim } from 'hooks/useHarvest'
import { usePools, usePriceCakeBusd } from '../../state/hooks'
import StakeModal from '../../components/modals/stakeModal'

interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

export const BIG_TEN = new BigNumber(10)
const ETHERS = BIG_TEN.pow(18)

const Card: React.FC<HarvestProps> = ({ pool }) => {
  const { sousId, stakingTokenName, stakingTokenAddress, apy, userData, pricePerShare, apr } = pool
  const { account } = useWallet()

  const stakingTokenContract = useERC20('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade')
  const { onApprove } = useVeRvrsApprove(stakingTokenContract, sousId)
  const { onStake } = useVeRvrsStake(sousId, false)
  const { onUnstake } = useVeRvrsUnstake(sousId)
  const [pendingTx, setPendingTx] = useState(false)

  const { onReward } = useVeRvrsClaim(sousId)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)

  const stakedRvrs = new BigNumber(pool.veRvrsUserData?.rvrsStaked.toString())

  const totalRvrsStaked = pool.veRvrsPublicData?.totalStaked.toString()

  const pendingRvrs = pool.veRvrsUserData?.pendingRvrs
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 18, minimumFractionDigits: 2 })
  const pendingVeRvrs = pool.veRvrsUserData?.pendingVeRvrs
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 18, minimumFractionDigits: 2 })

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedRvrs} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )
  const [onPresentDeposit] = useModal(
    <StakeModal max={stakingTokenBalance} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [requestedApproval, setRequestedApproval] = useState(false)

  return (
    <>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>Stake RVRS to Earn veRVRS &gt;.&gt;</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Total Staked</TypographyBold>
              <Typography>{totalRvrsStaked}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending veRVRS</TypographyBold>
              <Typography>{pendingVeRvrs}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending RVRS</TypographyBold>
              <Typography>{pendingRvrs}</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Staked RVRS</TypographyBold>
              <Typography>TODO</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending veRVRS</TypographyBold>
              <Typography>{pendingVeRvrs}</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '0px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Pending RVRS</TypographyBold>
              <Typography>{pendingRvrs}</Typography>
            </ContentCard>
          </Flex>
          {!allowance.toNumber() ? (
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
