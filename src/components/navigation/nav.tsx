import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Container, ButtonGroup } from 'react-bootstrap'
import useWalletModal from 'components/modals/WalletModal'
import { NavLink } from 'react-router-dom'
import Ripples from 'react-ripples'
import rvrs from 'config/constants/rvrs'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import { Flex } from '../layout/flex'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <MenuContainer>
      <ButtonGroup style={{ marginRight: '20px' }}>
        <Ripples>
          <NavButton
            style={{ marginRight: '-5px;' }}
            as={StyledNavLink}
            to="/vervrs"
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/vervrs')}
          >
            veRVRS
          </NavButton>
        </Ripples>
        <Ripples>
          <NavButton
            as={StyledNavLink}
            to="/airdrop"
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/airdrop')}
          >
            Airdrop
          </NavButton>
        </Ripples>
        <Ripples>
          <NavButton
            as={StyledNavLink}
            to="/liquidity"
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/liquidity')}
          >
            Liquidity
          </NavButton>
        </Ripples>
        <Ripples>
          <NavButton
            as={StyledNavLink}
            to="/bonds"
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/bonds')}
          >
            Bonds
          </NavButton>
        </Ripples>
      </ButtonGroup>

      <ButtonGroup>
        {account != null && account.length > 1 ? (
          <Flex style={{ alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', marginRight: '5px' }}>
              <ChainButton>
                <Flex alignItems="center">
                  <object type="image/svg+xml" data="/images/hmny.svg" width="20px">
                    &nbsp;
                  </object>
                  &nbsp;Harmony
                </Flex>
              </ChainButton>
            </div>
            <WalletButton
              style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: '0px' }}
              as={WalletNavLink}
              to="/dashboard"
              isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/dashboard')}
            >
              <Flex alignItems="center">
                {account.substring(0, 6)}
                <ActivePulse style={{ marginLeft: '5px' }} />
              </Flex>
            </WalletButton>
          </Flex>
        ) : (
          <Flex style={{ alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', marginRight: '5px' }}>
              <ChainButton>
                <Flex alignItems="center">
                  <object type="image/svg+xml" data="/images/hmny.svg" width="20px">
                    &nbsp;
                  </object>
                  &nbsp;Harmony
                </Flex>
              </ChainButton>
            </div>
            <WalletButton
              style={{ background: 'white', color: 'black' }}
              as={WalletNavLink}
              to="/dashboard"
              isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/dashboard')}
              disabled={rvrs.isLocked.unlockWalletButton}
              onClick={onPresentConnectModal}
              {...props}
            >
              Connect
            </WalletButton>
          </Flex>
        )}
      </ButtonGroup>
    </MenuContainer>
  )
}

const MenuContainer = styled(Container)`
  padding-top: 20px;
  text-align: center;
  background: transparent;
`

const WalletButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  background: transparent;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
  border-radius: 8px;
  padding: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: 10px 0px 30px -5px #55747d;
    border-color: #ffff !important;
    transform: translate(-2px);
  }

  @media screen and (max-width: 500px) {
    margin-top: 7px;
  }
`

const ChainButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  border-color: #313131;
  border-style: solid;
  border-radius: 8px;
  background: transparent;
  border-width: 1px;
  padding: 8px;
  cursor: default;

  @media screen and (max-width: 500px) {
    margin-top: 7px;
  }
`

const pulse = keyframes`
  0% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
`

const ActivePulse = styled.div`
  background: #ffffff;
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
  &:hover {
    background: white;
    color: #121212;
  }
`
const NavButton2 = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
  transition: 0.3s ease-in-out;
  margin-right: 2px;
  color: grey;
  &:hover {
    background: white;
    color: #121212;
  }
`

const New = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: white;
  display: inline-flex;
  background: #6699a3;
  padding: 1px;
  height: 10px;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus {
    // transform: translate(-1px);
    // text-decoration: underline;
    background: white;
    color: #121212;
    border-radius: 5px;
  }
`

const WalletNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus {
    box-shadow: 20px 0px 40px -20px #55747d;
    border-color: #ffff !important;
    transform: translate(0px);
  }
`

export default Nav
