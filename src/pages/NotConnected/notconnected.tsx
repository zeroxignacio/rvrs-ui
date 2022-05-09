import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Page from 'components/layout/containers/page'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Typography from 'components/layout/typography/typography'
import { Container } from 'react-bootstrap'
import useWalletModal from 'components/modals/WalletModal'
import rvrs from 'config/constants/rvrs'
import { Flex } from 'components/layout/flex'

const NOTCONNECTED = (props) => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Page>
      <CardContainer>
        <Card>
          <TypographyTitle disabled={rvrs.isLocked.unlockWalletButton} onClick={onPresentConnectModal} {...props}>
            Connect to Reverse
          </TypographyTitle>

          <TypographySmall>
            
            ...and gain access to decentralized investments
            <br />
            on Harmony, Avalanche, Ethereum, and beyond
          </TypographySmall>
          <br/>
          <Flex alignItems="center" justifyContent="center">
            <a
              style={{ marginLeft: '-5px' }}
              target="_blanK"
              rel="noreferrer"
              href="https://reverse.gitbook.io/docs/"
              className="nav-links"
            >
              <TypographyBold>Docs</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://paladinsec.co/projects/reverse-protocol/" className="nav-links">
              <TypographyBold>Security Audit</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
              <TypographyBold>Govern</TypographyBold>
            </a>
          </Flex>
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

const CardContainer = styled.div`
  align-self: baseline;
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin-bottom: 0px;
  border: 0px solid #ffff;
  box-shadow: 0px 0px 0px #a5a5a5;
  border: 0px;
  border-style: solid !important;
  border-color: #ffffff !important;
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
  //text-decoration: underline;
  background: white;
  color: black;
  min-width: 300px;
  justify-content: center;

  transition: all 0.3s ease-in-out;
  // animation: ${pulse} 5s infinite;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export default NOTCONNECTED
