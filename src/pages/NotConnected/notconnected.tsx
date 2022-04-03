import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Page from 'components/layout/containers/Page'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Container } from 'react-bootstrap'

const Card = styled(Container)`
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 15px;
`

const NotConnectedContainer = styled.div`
  align-self: baseline;
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin-bottom: 0px;
  border: 0px solid #FFFF;
  box-shadow: 0px 0px 0px #A5A5A5;
  border: 0px;
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
    font-size: 20px;
    font-weight: 700;
    align-items: center;
    display: inline-flex;
    transition: all 0.3s ease-in-out;
    animation: ${pulse} 5s infinite;
    :hover {
      color: #F3F3F3;
    }
`

const NOTCONNECTED = () => {
  const { account } = useWallet()

  return (
    <Page>
      <NotConnectedContainer>
        <Card>
          <TypographyTitle>Connect First</TypographyTitle>
        </Card>
      </NotConnectedContainer>
    </Page>
  )
}


export default NOTCONNECTED