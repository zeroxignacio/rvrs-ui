import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Container, ButtonGroup } from 'react-bootstrap'
import useWalletModal from 'components/modals/WalletModal'
import { NavLink } from 'react-router-dom'
import Ripples from 'react-ripples'
import rvrs from 'config/constants/rvrs'
import { Flex } from '../layout/flex'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <MenuContainer>
      <ButtonGroup style={{ marginRight: "20px" }}>
        <NavButton
          as={StyledNavLink}
          to="/upcoming"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/upcoming')
          }>veRVRS
        </NavButton>
        <NavButton
          as={StyledNavLink}
          to="/bonds"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/bonds')
          }
        >Bonds
        </NavButton>
        <NavButton
          as={StyledNavLink}
          to="/staking"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/staking')
          }>Staking
        </NavButton>
        <NavButton
          as={StyledNavLink}
          to="/airdrop"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/airdrop')
          }>Airdrop
        </NavButton>
      </ButtonGroup>
      <ButtonGroup>
        {account != null && account.length > 1 ?
          <Flex style={{ alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', borderRadius: 0, overflow: 'hidden', marginRight: '5px' }}>
              <Ripples>
                <ChainButton>
                  <Flex alignItems="center">
                    <object type="image/svg+xml" data="/images/hmny.svg" width="20px">&nbsp;</object>&nbsp;Harmony
                  </Flex>
                </ChainButton>
              </Ripples>
            </div>
            <WalletButton
              style={{ justifyContent: "space-between" }}
              as={StyledNavLink}
              to="/dashboard"
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/dashboard')
              }>
              <Flex alignItems="center">
                <object type="image/svg+xml" data="/images/hmny.svg" width="0px">&nbsp;</object>
                <div style={{ marginLeft: '0px', marginRight: '7px' }}>{account.substring(0, 6)} </div>
                <ActivePulse style={{ marginRight: '0px' }} />
              </Flex>
            </WalletButton>
          </Flex>
          :
          <Flex style={{ alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', borderRadius: 0, overflow: 'hidden', marginRight: '5px' }}>
              <Ripples>
                <ChainButton>
                  <Flex alignItems="center">
                    <object type="image/svg+xml" data="/images/hmny.svg" width="20px">&nbsp;</object>&nbsp;Harmony
                  </Flex>
                </ChainButton>
              </Ripples>
            </div>
            <WalletButton
              as={StyledNavLink}
              to="/dashboard"
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/dashboard')
              }
              disabled={rvrs.isLocked.unlockWalletButton}
              onClick={onPresentConnectModal} {...props}>
              <Flex alignItems="center">
                <div>Connect</div>
              </Flex>
            </WalletButton>
          </Flex>
        }
      </ButtonGroup>
    </MenuContainer>
  )
}

const MenuContainer = styled(Container)`
  padding-top: 20px;
  text-align: center;
  flex-wrap: wrap;
  max-width: 590px;
  background: transparent;
`

const WalletButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  background: transparent;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
  border-radius: 9px;
  padding: 10px;
  transition: 0.3s ease-in-out;
  &:hover  {
    box-shadow: 20px 0px 40px -20px #55747D;
    border-color: #FFFF !important;
    transform: translate(-2px)
  }
`

const ChainButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  border-color: #313131;
  border-style: solid;
  border-radius: 8px;
  background: transparent;
  border-width: 1px;
  padding: 8px;
  transition: 0.3s ease-in-out;
  :hover {
    background: transparent;
  }
`

const pulse = keyframes`
  0% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
`

const ActivePulse = styled.div`
  background: #FFFFFF;
  border-radius: 50%;
  margin: 0px;
  height: 8px;
  width: 8px;
  opacity: 0.8;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${pulse} 2s infinite;
`

const NavButton = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
  transition: 0.3s ease-in-out;
  margin-right: 2px;
  &:hover  {
    background: white;
    color: black;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    transform: translate(0px);
    // text-decoration: underline;
    background: white;
    color: black;
    border-radius: 5px;
  }
`

export default Nav