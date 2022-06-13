import React from 'react'
import Modal from 'components/modals/components/modal'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components'
import { Flex } from 'components/layout/flex'
import WalletCard from './WalletCard'
import config from './config'
import { Login } from './types'

interface Props {
  login: Login
  onDismiss?: () => void
}

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => (
  <Modal title="Connect to Reverse" onDismiss={onDismiss}>
    <div style={{marginTop:"-10px"}}>
      {config.map((entry, index) => (
        <WalletCard
          key={entry.title}
          login={login}
          walletConfig={entry}
          onDismiss={onDismiss}
          mb={index < config.length - 1 ? '8px' : '0'}
        />
      ))}
      <Flex justifyContent="center">
        <a target="_blanK" rel="noreferrer" href="https://metamask.io/" className="nav-links">
          <TypographySmall>
            Get Metamask Here <FaExternalLinkSquareAlt />
          </TypographySmall>
        </a>
      </Flex>
    </div>
  </Modal>
)

const TypographySmall = styled.p`
  font-size: 14px;
  color: #9b9b9b;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 10px;
  :hover {
    opacity: 0.6;
  }
  transition: all 0.3s ease-in-out;

`

export default ConnectModal
