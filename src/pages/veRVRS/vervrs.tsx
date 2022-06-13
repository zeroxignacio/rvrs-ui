import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { usePools } from 'state/hooks'
import Page from 'components/layout/containers/page'
import { Card as PoolCard } from './card'

const VeRvrs: React.FC = () => {
  const { account } = useWallet()
  let pools = usePools(account)
  pools = pools.filter((p) => p.sousId === 1)
  const poolsWithApy = pools.map((pool) => {
    return {
      ...pool,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()

  return (
    <Page>
      <Route>
        {orderBy(openPools, ['sortOrder']).map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} />
        ))}
      </Route>
    </Page>
  )
}

export default VeRvrs
