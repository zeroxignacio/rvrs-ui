import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import useWalletModal from 'components/WalletModal'
import { NavLink } from 'react-router-dom'
import rvrs from 'config/constants/rvrs'
import { Flex } from '../layout/flex'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <MenuContainer>
      <ButtonGroup style={{ marginRight: "20px" }}>
        <ButtonContainer>
          <StyledButton
            as={StyledNavLink}
            to="/staking"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/staking')
            }>Staking
          </StyledButton>
          <StyledButton
            as={StyledNavLink}
            to="/bonds"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/bonds')
            }
          >&nbsp;Bonds&nbsp;
          </StyledButton>
          <StyledButton
            as={StyledNavLink}
            to="/airdrop"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/airdrop')
            }>Airdrop
          </StyledButton>
        </ButtonContainer>
      </ButtonGroup>
      <ButtonGroup>
        {account != null && account.length > 1 ?
          <ConnectedButton
            style={{ justifyContent: "space-between" }}
            as={StyledNavLink}
            to="/dashboard"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/airdrop')
            }>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: '10px', marginRight: '20px' }}>{account.substring(0, 6)} </div>
            </Flex>
          </ConnectedButton>
          :
          <ConnectButton
            as={StyledNavLink}
            to="/dashboard"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/dashboard')
            }
            disabled={rvrs.isLocked.unlockWalletButton}
            onClick={onPresentConnectModal} {...props}>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: '10px', marginRight: '20px' }}>Connect</div>
            </Flex>
          </ConnectButton>
        }
      </ButtonGroup>
    </MenuContainer>
  )
}

const MenuContainer = styled(Container)`
  padding-top: 50px;
  text-align: end;
  flex-wrap: wrap;
  max-width: 730px;
`

const StyledButton = styled.div`
  background-color: #2D3544;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: #FFFF solid 0px;
  border-radius: 35px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 27px;
  padding-right: 27px;
  transition: 0.3s ease-in-out;
  &:hover  {
    background-color: #374052;
  }
`

const ConnectedButton = styled.div`
  background-color: #2D3544;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 35px;
  padding: 5px;
  transition: 0.3s ease-in-out;
  &:hover  {
    background-color: #374052;
    box-shadow: 20px 0px 40px -20px #55747D, -20px 0px 20px -20px #4B5674;
    border-color: #FFFF !important;
    transform: translate(-6px)
  }
`

const pulse = keyframes`
  0% {
    box-shadow: -50px 0 40px -30px #55747D, 50px 0 40px -30px #4B5674;
  }
  50% {
    box-shadow: 20px 0 40px -20 #55747D, -20px 0 40px -20 #4B5674;
  }
  100% {
    box-shadow: -50px 0 40px -30px #55747D, 50px 0 40px -30px #4B5674;
  }
`

const ConnectButton = styled.div`
  background-color: #2D3544;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 35px;
  padding: 5px;
  transition: 0.3s ease-in-out;
  box-shadow: -30px 0px 50px -5px #55747D, 30px 0px 50px -5px #4B5674;
  &:hover  {
    font-weight: 700;
    border-color: #FFFF !important;
    box-shadow: 20px 0px 40px 0px #55747D, -20px 0px 40px 0px #4B5674;
    background-color: #374052;
    transform: translate(-6px)
  }
`

const ButtonContainer = styled.div`
  border-radius: 35px;
  background-color: #2D3544;
  padding-top: 23px;
  padding-bottom: 23px;
  border: 1.5px;
  border-color: #CBCBCB !important;
  border-style: solid !important;
  box-shadow: -20px 0px 40px -15px #55747D, 20px 0px 40px -15px #4B5674;

  transition: 0.3s ease-in-out;
  &:hover  {
    box-shadow: 25px 0px 40px -10px #55747D, -25px 0px 40px -10px #4B5674;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    background-image: linear-gradient(to right, #464F68, #516B73);
    transform: translate(0px)
  }
`

export default Nav