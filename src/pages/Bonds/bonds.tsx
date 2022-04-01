import React, { useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import Ripples, { createRipples } from 'react-ripples'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import Typography from 'components/layout/typography/typography'
import styled from 'styled-components'
import Flex from 'components/layout/flex/Flex'
import ActiveInactiveButton from 'components/layout/buttons/activeInactiveButton'
import ActiveInactiveContatiner from 'components/layout/containers/activeInactiveContainer'
import useBlock from 'hooks/useBlock'
import { Container } from 'react-bootstrap'
import { usePools2, usePrices, getTotalValueFromQuoteTokens, lookupPrice } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import Page from 'components/layout/containers/page'
import PoolCard from './card'


const BondsContainer = styled.div`
  background: #121212;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  border-width: 0px;
  border-color: #313131;
  border-style: solid;
`

const AirdropContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(45deg, #313131 , #4D4D4D);
  border-radius: 5px;
  padding: 1.5px;
`

const TitleCard = styled(Container)`
  border-radius: 0px;
  justify-content: space-between;
  position: center;
  background: #161616;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  border-width: 0px;
  border-color: #313131;
  border-style: solid;
`

const Bond: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const pools2 = usePools2(account)
  const prices = usePrices()
  const block = useBlock()
  const poolsWithApy = pools2.map((pool2) => {
    let quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    if (pool2.isSingleAsset) { quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2) }
    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool2.quoteTokenSymbol, prices)
    const rewardTokenPrice = lookupPrice(QuoteToken.RVRS, prices)
    const totalRewardPricePerYear = rewardTokenPrice.times(pool2.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const apy = totalRewardPricePerYear.div(tvl).times(100).minus(100)
    return { ...pool2, isFinished: pool2.sousId === 0 ? false : pool2.isFinished && block > pool2.endBlock, apy, tvl }
    // console.log(pool2.sousId, quoteTokens && quoteTokens.toNumber(), tvl && tvl.toNumber())
    // console.log("APY", pool2, tvl && tvl.toNumber())
    // console.log("TVL", pool2.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool2.totalStaked))
    // console.log("price", pool2.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())
  })
  const [finishedPools, openPools] = partition(poolsWithApy, (pool2) => pool2.isFinished)
  const { url, isExact } = useRouteMatch()
  const [modalOpen, setModalOpen] = useState(true)
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }

  return (
    <Page>
         <AirdropContainerWrap>

        <BondsContainer>
          <TitleCard style={{ justifyContent: 'space-between' }}>
            <TypographyTitle style={{ marginTop: '0px', marginBottom: '0px' }}>
              rvBonds
            </TypographyTitle>
          </TitleCard>
          <Route path={`${path}`}>
            {orderBy(openPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2} />))}
          </Route>
        </BondsContainer>
      </AirdropContainerWrap>
      <AirdropContainerWrap style={{ marginTop: '20px' }}>
        <BondsContainer>
          <TitleCard style={{ justifyContent: 'space-between' }}>
            <TypographyTitle style={{ marginTop: '0px', marginBottom: '0px' }}>
              Inactive rvBonds
            </TypographyTitle>
            { /* Active/Inactive button */}
          </TitleCard>

          { /* Bonds card layout */}
          <Route path={`${path}`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2} />))}
          </Route>
        </BondsContainer>
      </AirdropContainerWrap>

      <AirdropContainerWrap style={{ marginTop: '20px' }}>
      <BondsContainer style={{ padding: '15px' }}>
        <Flex justifyContent="center">
          <Typography>Reverse offers linearly vested bonds by variable returns that use an algorithm to calculate the amount of RVRS to sell for UST.</Typography>
        </Flex>
      </BondsContainer>
    </AirdropContainerWrap>
    
    </Page>
  )
}

export default Bond


