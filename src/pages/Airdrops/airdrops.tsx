import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/Page'
import { Flex } from '@reverse/uikit'
import BigNumber from 'bignumber.js'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import TitleCard from 'components/layout/cards/TitleCard'
import ContentCard from 'components/layout/cards/ContentCard'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import Ripples, { createRipples } from 'react-ripples'
import ClaimButtonDisabled from 'components/layout/buttons/claimAirdropButtonDisabled'
import ClaimButton from 'components/layout/buttons/claimAirdropButton'
import { useAirdropData } from "../../state/hooks"
import useAirdropClaim from "../../hooks/useAirdropClaim"
import { getBalanceNumber } from "../../utils/formatBalance"


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
  const totalDistributedNo = totalDistributed;
  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 2 });
  const claimedNotZero = claimed > 0;
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })
  const claimedStr = claimed.toLocaleString('en-us', { maximumFractionDigits: 3 })
  const lastClaimAmountStr = lastClaimAmount.toLocaleString('en-us', { maximumFractionDigits: 0 })
  const [pendingTxn, setPendingTxn] = useState(false)
  const handleAirdropClaim = useCallback(async () => {
    try {
      setPendingTxn(true)
      const txHash = await onAirdropClaim()
      if (!txHash) { setPendingTxn(false) }
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
              <TypographyTitle>Claim Your Weekly&nbsp;</TypographyTitle>
              <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/the-protocol/reverseum-bonding-pools" className="nav-links">
                <TypographyTitle style={{ borderBottom: '1px dotted #FFFF' }}>UST Airdrop</TypographyTitle>
              </a>
            </TitleCard>
            <Flex justifyContent="center">
              <ContentCard style={{ marginRight: '10px' }}>
                {totalDistributedNo > 0 ?
                  <TypographyBold style={{ marginBottom: '5px' }}>${totalDistributedStr}</TypographyBold>
                  :
                  <Typography><Skeleton height={20} marginBottom="5px" /></Typography>
                }
                <Typography>Total Distributed</Typography>
              </ContentCard>
              <ContentCard>
                {expectedReturnsNo > 1 ?
                  <TypographyBold style={{ marginBottom: '5px' }}>{expectedReturnsStr} UST</TypographyBold>
                  :
                  <Typography><Skeleton height={20} marginBottom="5px" /></Typography>
                }
                <Typography>Yearly Returns</Typography>
              </ContentCard>
              <ContentCard style={{ marginLeft: '10px' }}>
                {claimedNotZero ?
                  <div>
                    <TypographyBold style={{ marginBottom: '5px' }}>{claimedStr} UST</TypographyBold>
                    <Typography>Claimed</Typography>
                  </div>
                  :
                  <div>
                    <TypographyBold style={{ marginBottom: '7px' }}><Skeleton /></TypographyBold>
                    <Typography>UST Claimed</Typography>
                  </div>
                }
              </ContentCard>
            </Flex>
            <Flex justifyContent="space-between" marginTop="20px">
              <Flex style={{ textAlign: 'center', alignItems: 'center' }}>
                <ClaimButtonDisabled disabled>
                  <Typography>Claimed ${lastClaimAmountStr} to Date</Typography>
                </ClaimButtonDisabled>
              </Flex>
              {toClaim && toClaim > 0 ?
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
                :
                <ClaimButton disabled style={{opacity: '0.3'}}>
                  Come back next week!
                </ClaimButton>
              }
            </Flex>
          </LayoutContainer>
        </Wrap>
        <Wrap style={{ marginTop: '20px' }}>
          <LayoutContainer style={{ padding: '15px' }}>
            <Flex justifyContent="center">
              <Typography>Yield earned through the Reverseum Treasury positions is converted to UST and distributed to veRVRS and RVRS holders every monday.</Typography>
            </Flex>
          </LayoutContainer>
        </Wrap>
      </Page>
    </>
  )
}

export default Airdrop