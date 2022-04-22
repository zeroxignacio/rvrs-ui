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
import Ripples, { createRipples } from 'react-ripples'
import ClaimButtonDisabled from 'components/layout/buttons/claimAirdropButtonDisabled'
import ClaimButton from 'components/layout/buttons/claimAirdropButton'
import { Container } from 'react-bootstrap'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styled from 'styled-components'
import { useAirdropData } from '../../state/hooks'
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
  const totalDistributedNo = totalDistributed
  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const claimedNotZero = claimed > 0
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })
  const claimedStr = claimed.toLocaleString('en-us', { maximumFractionDigits: 3 })
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
              <Tippy content="Expected UST returns based on your historical performance">
                <ContentCard>
                  {expectedReturnsNo > 1 ? (
                    <TypographyBold style={{ marginBottom: '5px' }}>{expectedReturnsStr} UST</TypographyBold>
                  ) : (
                    <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
                  )}
                  <Typography>Yearly Returns</Typography>
                </ContentCard>
              </Tippy>
              <Tippy content="Your UST allocation relative to the total amount of UST distributed each monday">
                <ContentCard style={{ marginLeft: '10px' }}>
                  <div>
                    <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
                    <Typography>Net Allocation</Typography>
                  </div>
                </ContentCard>
              </Tippy>
            </Flex>
            <Flex justifyContent="space-between" marginTop="20px">
              <Tippy content="Amount of UST you have claimed to date">
                <Flex style={{ textAlign: 'center', alignItems: 'center' }}>
                  <ClaimButtonDisabled disabled>
                    <Typography>Claimed ${lastClaimAmountStr} to Date</Typography>
                  </ClaimButtonDisabled>
                </Flex>
              </Tippy>

              {toClaim && toClaim > 0 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    borderRadius: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Ripples>
                    <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
                      Collect ${toClaimStr}
                    </ClaimButton>
                  </Ripples>
                </div>
              ) : (
                <ClaimButton disabled style={{ opacity: '0.3', cursor: 'not-allowed' }}>
                  Come back next week!
                </ClaimButton>
              )}
            </Flex>
          </LayoutContainer>
        </Wrap>
        <Wrap style={{ marginTop: '20px' }}>
          <LayoutContainer style={{ padding: '15px' }}>
            <Flex justifyContent="center">
              <Typography style={{lineHeight:'1.1'}}>
                Yield earned through the Reverseum Treasury positions is converted to UST and distributed to veRVRS and
                RVRS holders every monday.
              </Typography>
            </Flex>
          </LayoutContainer>
        </Wrap>
      </Page>
    </>
  )
}

const Wrap = styled(Container)`
  border-radius: 5px;
  padding: 2px;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
`

export default Airdrop
