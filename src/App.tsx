import React, { useEffect, Suspense, lazy } from 'react'
import styled, { keyframes } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@reverse/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import MenuBottom from 'components/navigation/footer'
import Style from 'components/Style'
import { Container } from 'react-bootstrap'
import pools from 'config/constants/stake'
import { ToastContainer } from 'react-toastify'
import Page from 'components/layout/containers/page'
import Nav from './components/navigation/nav'
import Beta from './components/navigation/beta'


BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const BONDS = lazy(() => import('./pages/Bonds'))
const MIGRATION = lazy(() => import('./pages/Migration'))
const NOTCONNECTED = lazy(() => import('./pages/NotConnected'))
const DASHBOARD = lazy(() => import('./pages/Dashboard'))
const AIRDROP = lazy(() => import('./pages/Airdrops'))
const VERVRS = lazy(() => import('./pages/veRVRS'))
const LIQUIDITY = lazy(() => import('./pages/Liquidity'))

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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <Beta />
      <Page>

      <CardContainer>
        <Card>
          <TypographySmall>
            due to the ust situation, reverse is undergoing a token migration 
            <br />
            and protocol upgrade. please join the discord to stay up to date.
          </TypographySmall>
          </Card>
      </CardContainer>
      </Page>

      {/*
      {account != null && account.length > 1 ? (
        <Suspense fallback>
          <Route path="/bonds">
            <BONDS />
          </Route>
          <Route path="/liquidity">
            <LIQUIDITY />
          </Route>
          <Route path="/airdrop">
            <AIRDROP />
          </Route>
        </Suspense>
      ) : (
        <Suspense fallback>
          <NOTCONNECTED />
        </Suspense>
      )}
      */ }

      <MenuBottom />
    </Router>

  )
}

const TypographySmall = styled.p`
  font-size: 14px;
  color: #9b9b9b;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`

const TypographyBold = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0px;
  margin-right: 3px;
  margin-left: 3px;
  transition: 0.3s ease-in-out;
`

const Card = styled(Container)`
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 15px;
`

const CardContainer = styled.div`
  align-self: baseline;
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin-bottom: 210px;
  border: 0px solid #ffff;
  box-shadow: 0px 0px 0px #a5a5a5;
  border: 0px;
  border-style: solid !important;
  border-color: #ffffff !important;
`


export default React.memo(App)
