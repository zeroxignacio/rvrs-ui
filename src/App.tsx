import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@reverse/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import Switch from 'react-bootstrap/esm/Switch'
import MenuBottom from 'components/navigation/footer'
import Style from 'components/Style'
import Nav from './components/navigation/nav'
import Beta from './components/navigation/beta'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const BONDS = lazy(() => import('./pages/Bonds'))
const STAKEDEPRECATED = lazy(() => import('./pages/Staking'))
const NOTCONNECTED = lazy(() => import('./pages/NotConnected'))
const DASHBOARD = lazy(() => import('./pages/Dashboard'))
const AIRDROP = lazy(() => import('./pages/Airdrops'))
const LANDING = lazy(() => import('./pages/Landing'))


const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])
  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <Style />
      <Beta />
      <Nav />
      {account != null && account.length > 1 ?
        <Suspense fallback>
          <Switch>
            <Route path="/" exact>
              <LANDING />
            </Route>
            <Route path="/bonds">
              <BONDS />
            </Route>
            <Route path="/staking">
              <STAKEDEPRECATED />
            </Route>
            <Route path="/dashboard">
              <DASHBOARD />
            </Route>
            <Route path="/airdrop">
              <AIRDROP />
            </Route>
            </Switch>
        </Suspense>
        :
        <Suspense fallback>
          <NOTCONNECTED />
        </Suspense>
      }
      <MenuBottom />
    </Router >
  )
}

export default React.memo(App)
