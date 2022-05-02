import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import TitleCard from 'components/layout/cards/TitleCard'
import ContentCard from 'components/layout/cards/ContentCard'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Ripples from 'react-ripples'
import ClaimButtonDisabled from 'components/layout/buttons/claimAirdropButtonDisabled'
import ClaimButton from 'components/layout/buttons/claimAirdropButton'
import { Container } from 'react-bootstrap'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styled from 'styled-components'
import ContentCardAlt from 'components/layout/cards/ContentCardAlt'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Wrap from 'components/layout/containers/Wrap'
import { useBurnedBalance, useNonCirculatingBalance, useStakedBalance, useTotalSupply } from 'hooks/useTokenBalance'
import { useAirdropData, usePriceCakeBusd } from '../../state/hooks'
import useAirdropClaim from '../../hooks/useAirdropClaim'
import { getBalanceNumber } from '../../utils/formatBalance'

const Airdrop = () => {
  const { account } = useWallet()
  const airdropData = useAirdropData(account)
  const { onAirdropClaim } = useAirdropClaim(account)
  const totalDistributed = getBalanceNumber(airdropData.totalDistributed)
  const toClaim = getBalanceNumber(airdropData.userClaimable)
  const claimed = getBalanceNumber(airdropData.userTotalClaimed)
  const lastClaimAmount = getBalanceNumber(airdropData.userLastClaimedAmount)
  const expectedReturnsNo = new BigNumber(lastClaimAmount).times(52.2).toNumber()
  const expectedReturnsStr = expectedReturnsNo.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const totalDistributedNo = new BigNumber(totalDistributed).plus(501745).toNumber()
  const totalDistributedStr = totalDistributedNo.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const rvrsPrice = usePriceCakeBusd()

  const allocationStr = new BigNumber(lastClaimAmount)
    .div(8500)
    .times(100)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })

  const stakedBalanceUsd = useStakedBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade').times(rvrsPrice)

  // need to add last distr. to contract to automate this
  const aprStr = new BigNumber(8500)
    .div(stakedBalanceUsd)
    .times(100)
    .times(52)
    .times(1e18)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const claimedNotZero = claimed > 0
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const claimedStr = claimed.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const lastClaimAmountStr = lastClaimAmount.toLocaleString('en-us', { maximumFractionDigits: 0 })
  const [pendingTxn, setPendingTxn] = useState(false)

  const handleAirdropClaim = useCallback(async () => {
    try {
      setPendingTxn(true)
      const txHash = await onAirdropClaim()
      if (!txHash) {
        setPendingTxn(false)
      }
    } catch (e) {
      console.error(e)
      setPendingTxn(false)
    }
  }, [onAirdropClaim, setPendingTxn])

  const notiftSuccess = () =>
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

  const notiftPending = () =>
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

  return (
    <>
      <Page>
        <Wrap>
          <LayoutContainer>
            <TitleCard style={{ marginBottom: '10px' }}>
              <TypographyTitle>Claim Your UST Airdrop</TypographyTitle>
            </TitleCard>
            <Flex justifyContent="center">
              <Tippy content="Total amount of UST distributed to date to protocol participants">
                <ContentCard style={{ marginRight: '10px' }}>
                  {totalDistributedNo > 0 ? (
                    <TypographyBold style={{ marginBottom: '5px' }}>${totalDistributedStr}</TypographyBold>
                  ) : (
                    <Typography>
                      <Skeleton height={20} marginBottom="5px" />
                    </Typography>
                  )}
                  <Typography>Total Distributed</Typography>
                </ContentCard>
              </Tippy>
              <Tippy content="Expected annual rate on airdrops alone. The APR is calculated with a very simplified formula that assumes airdrops remain constant for a year">
                <ContentCard>
                  <TypographyBold style={{ marginBottom: '5px' }}>{aprStr}%</TypographyBold>
                  <Typography>Annual Rate</Typography>
                </ContentCard>
              </Tippy>
              <Tippy content="Your UST allocation relative to the total amount of UST distributed each monday. It will be calculated once you claim your first airdrop">
                <ContentCard style={{ marginLeft: '10px' }}>
                  {expectedReturnsNo > 1 ? (
                    <TypographyBold style={{ marginBottom: '5px' }}>{allocationStr}%</TypographyBold>
                  ) : (
                    <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
                  )}
                  <Typography>Net Allocation</Typography>
                </ContentCard>
              </Tippy>
            </Flex>
            <Flex justifyContent="center">
              <Tippy content="Expected UST returns based on your historical performance. It will be calculated once you claim your first airdrop">
                <ContentCardAlt style={{ marginTop: '10px' }}>
                  {expectedReturnsNo > 1 ? (
                    <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>
                      +${expectedReturnsStr} UST
                    </TypographyBold>
                  ) : (
                    <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>+TBD</TypographyBold>
                  )}
                  <Typography>Expected Yearly Interest</Typography>
                </ContentCardAlt>
              </Tippy>
            </Flex>
            <Flex justifyContent="space-between" marginTop="20px">
              <Tippy content="Amount of UST you have claimed to date">
                <Flex style={{ textAlign: 'center', alignItems: 'center' }}>
                  <ClaimButtonDisabled style={{ padding: '8px' }} disabled>
                    <Flex alignItems="center">
                      <Typography style={{ alignItems: 'center' }}>Claimed ${claimedStr}&nbsp;</Typography>
                      <img
                        width="23px"
                        style={{ marginLeft: '0px', marginBottom: '0px' }}
                        className="img-fluid"
                        src={`${process.env.PUBLIC_URL}/ust.svg`}
                        alt="logo"
                      />
                      <Typography style={{ alignItems: 'center' }}>&nbsp;to Date</Typography>
                    </Flex>
                  </ClaimButtonDisabled>
                </Flex>
              </Tippy>
              {toClaim > 0 ? (
                <Ripples>
                  <ClaimButton
                    onClick={async () => {
                      notiftPending()
                      setPendingTxn(true)
                      await onAirdropClaim()
                      setPendingTxn(false)
                      notiftSuccess()
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
                    Claim ${toClaimStr}
                  </ClaimButton>
                </Ripples>
              ) : (
                <ClaimButton disabled style={{ opacity: '0.3', cursor: 'not-allowed' }}>
                  Come back next week!
                </ClaimButton>
              )}
            </Flex>
          </LayoutContainer>
        </Wrap>
        <Wrap style={{ marginTop: '20px' }}>
          <LayoutContainer>
            <Flex justifyContent="center">
              <Typography style={{ lineHeight: '1.1' }}>
                Yield earned through the Reverseum Treasury positions is converted to UST and distributed RVRS stakers
                every monday. Airdrops can be claimed any time and do not expire.
              </Typography>
            </Flex>
          </LayoutContainer>
        </Wrap>
      </Page>
    </>
  )
}

const TypoLink = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0px;
  text-decoration: underline;
`

export default Airdrop
