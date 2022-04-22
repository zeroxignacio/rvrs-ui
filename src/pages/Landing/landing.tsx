import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward } from 'react-icons/fa'
import { Container } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import TierCard from 'components/layout/cards/TierCard'
import ReactTooltip from 'react-tooltip'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { getBalanceNumber } from '../../utils/formatBalance'

const Dashboard = () => {
  const { account } = useWallet()

  const between = (x: any, min: number, max: number): boolean => {
    return x >= min && x <= max
  }

  const evaluateTier = (balance: number): number => {
    if (between(balance, 100, 1000)) return 1
    if (between(balance, 1000, 5000)) return 2
    if (between(balance, 5000, 10000)) return 3
    if (balance > 10000) return 4
    return 0
  }

  // wallet balance rvrs/vervrs
  const rvrsBalanceNo = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const rvrsBalanceStr = rvrsBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Page>
    <CardContainer>
    <object type="image/svg+xml" data="/images/reverse.svg" width="250px" style={{ marginBottom: "20px" }}>&nbsp;</object>

      </CardContainer>

    </Page>
  )
}

const Card = styled(Container)`
  flex-direction: column;
  position: center;
  text-align: center;
`

const CardContainer = styled.div`
  align-self: baseline;
  margin-top: 150px;
  text-align: center;
  border-style: solid !important;
  border-color: #FFFFFF !important;
`


const pulse = keyframes`
  0% {
    text-shadow: 2px 2px #6699A3;
  }
  50% {
    text-shadow: 2px 2px 10px #5F6F92;
  }
  100% {
    text-shadow: 2px 2px #6699A3;
  }
`

const TypographyTitle = styled.h1`
    font-size: 30px;
    font-weight: 700;
    align-items: center;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    animation: ${pulse} 5s infinite;
    cursor: default;
`

export default Dashboard
