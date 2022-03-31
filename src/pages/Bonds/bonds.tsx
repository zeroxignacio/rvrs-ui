import React, { useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import Ripples, { createRipples } from 'react-ripples'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import TypographyTitle from 'components/layout/typography/typographyTitle'
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
background-image: linear-gradient(#2E343E, #323E51);
  border-radius: 20px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
`

const TitleCard = styled(Container)`
  background-image: linear-gradient(to right, #353E50, #3D4853);
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 20px;
`

const Typography = styled.p`
    font-size: 16px;
    color: #fffff;
    font-weight: 600;
    min-width: 70px;
    max-width: 70px;
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
    const apy = totalRewardPricePerYear.div(tvl).times(100)
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
      <BondsContainer>

        <TitleCard>
          <TypographyTitle style={{ marginTop: '10px', marginBottom: '10px' }}>
            RVRS rvBonds
          </TypographyTitle>
        </TitleCard>

        <Flex alignItems="center" style={{ padding: '20px', paddingLeft: '50px', paddingRight: '120px', marginTop: '20px' }} justifyContent='space-between'>
          <Typography>Bond</Typography>
          <Typography>ROI</Typography>
          <Typography>Vesting</Typography>
          <Typography>Bonded</Typography>
        </Flex>

        { /* Bonds card layout */}
        <Route path={`${path}`}>
          {orderBy(openPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2} />))}
        </Route>
        <Route path={`${path}/inactive`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2} />))}
        </Route>

        { /* Active/Inactive button */}
        <ActiveInactiveContatiner>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 25,
              overflow: 'hidden',
            }}
          >
            <Ripples>
              <ActiveInactiveButton as={Link} className="nav-links" to={`${url}`}>
                Active
              </ActiveInactiveButton>
            </Ripples>
          </div>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 15,
              overflow: 'hidden',
            }}
          >
            <Ripples>
              <ActiveInactiveButton as={Link} className="nav-links" to={`${url}/inactive`}>Inactive</ActiveInactiveButton>
            </Ripples>
          </div>
        </ActiveInactiveContatiner>
      </BondsContainer>

    </Page>
  )
}

export default Bond


