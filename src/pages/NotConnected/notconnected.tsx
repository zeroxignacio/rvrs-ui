import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Page from 'components/layout/containers/page'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Container } from 'react-bootstrap'
import useWalletModal from 'components/modals/WalletModal'
import rvrs from 'config/constants/rvrs'


const NOTCONNECTED = (props) => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  
  return (
    <Page>
      <CardContainer>
        <Card>
          <TypographyTitle
           disabled={rvrs.isLocked.unlockWalletButton}
           onClick={onPresentConnectModal} {...props}
           >Connect First</TypographyTitle>
        </Card>
      </CardContainer>
    </Page>
  )
}


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
  margin-top: 180px;
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
      cursor: pointer;
      opacity: 0.6;
    }
`


export default NOTCONNECTED