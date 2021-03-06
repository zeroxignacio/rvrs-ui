import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import Typography from 'components/layout/typography/typography'
import Flex from 'components/layout/flex/Flex'
import useBlock from 'hooks/useBlock'
import { usePools2, usePrices, getTotalValueFromQuoteTokens, lookupPrice } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import Page from 'components/layout/containers/page'
import Wrap from 'components/layout/containers/Wrap'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import TitleCard from 'components/layout/cards/TitleCard'
import { padding, position } from 'styled-system'
import PoolCard from './card'

const Bond: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const pools2 = usePools2(account)
  const prices = usePrices()
  const block = useBlock()
  const poolsWithApy = pools2.map((pool2) => {
    let quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    if (pool2.isSingleAsset) {
      quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool2.quoteTokenSymbol, prices)
    const rewardTokenPrice = lookupPrice(QuoteToken.RVRS, prices)
    const totalRewardPricePerYear = rewardTokenPrice.times(pool2.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    return { ...pool2, isFinished: pool2.sousId === 0 ? false : pool2.isFinished && block > pool2.endBlock, apy, tvl }
  })
  const [finishedPools, openPools] = partition(poolsWithApy, (pool2) => pool2.isFinished)
  const { url, isExact } = useRouteMatch()
  const [modalOpen, setModalOpen] = useState(true)
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }
  const rewardTokenPriceStr = lookupPrice(QuoteToken.RVRS, prices)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Page>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ padding: '10px' }}>
            <TypographyTitle>Active Bonds</TypographyTitle>
          </TitleCard>
          <Divider />
          <ScrollDiv>
            <Route path={`${path}`}>
              {orderBy(openPools, ['sortOrder']).map((pool2) => (
                <PoolCard key={pool2.sousId} pool2={pool2} />
              ))}
            </Route>
          </ScrollDiv>
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <TitleCard style={{ padding: '10px' }}>
            <TypographyTitle>Inactive Bonds</TypographyTitle>
          </TitleCard>
          <Divider />
          <ScrollDiv>
            <Route path={`${path}`}>
              {orderBy(finishedPools, ['sortOrder']).map((pool2) => (
                <PoolCard key={pool2.sousId} pool2={pool2} />
              ))}
            </Route>
          </ScrollDiv>
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Flex>
            <Typography style={{ lineHeight: '1.1' }}>
              Reverse sells algorithmic and linearly vested bonds with variable returns to grow its treasury and expand
              its yields. Bonds &apos;Sell Out&apos;   when vROI goes below 5.00% and a Net Return is calculated. Both
              vROI and Return depend on the price of RVRS.
            </Typography>
          </Flex>
        </LayoutContainer>
      </Wrap>
    </Page>
  )
}

const ScrollDiv = styled.div`
  overflow-y: scroll;
  max-height: 170px;
`

const Divider = styled.div`
  height: 10px;
`

export default Bond
