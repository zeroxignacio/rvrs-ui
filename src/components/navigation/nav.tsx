import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import useWalletModal from 'components/modals/WalletModal'
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
              <object type="image/svg+xml" data="/images/hmny.svg" width="0px">&nbsp;</object>
              <div style={{ marginLeft: '5px', marginRight: '10px' }}>{account.substring(0, 6)} </div>
              <ActivePulse  style={{ marginRight: '0px' }}/>
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
              <div style={{ marginLeft: '17px', marginRight: '25px' }}>Connect</div>
            </Flex>
          </ConnectButton>
        }
      </ButtonGroup>
    </MenuContainer>
  )
}

const MenuContainer = styled(Container)`
  padding-top: 50px;
  // text-align: end;
  flex-wrap: wrap;
  // max-width: 680px;
  text-align: center;
  background: transparent;
`

const ConnectedButton = styled.div`
  background: transparent;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
  border-radius: 15px;
  padding: 15px;
  transition: 0.3s ease-in-out;
  &:hover  {
    // background-color: #374052;
    box-shadow: 20px 0px 40px -20px #55747D, -20px 0px 20px -20px #4B5674;
    border-color: #FFFF !important;
    transform: translate(-3px)
  }
`

const activePulse = keyframes`
  0% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(154, 206, 206, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(154, 206, 206, 0);
  }

  100% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(154, 206, 206, 0.7);
`

const ActivePulse = styled.div`
  background: #9ACECE;
  border-radius: 50%;
  margin: 0px;
  height: 10px;
  width: 10px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${activePulse} 2s infinite;
`


const ConnectButton = styled.div`
  background: transparent;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 35px;
  padding: 5px;
  transition: 0.3s ease-in-out;
  box-shadow: -20px 0px 30px -10px #55747D, 20px 0px 30px -10px #4B5674;
  &:hover  {
    font-weight: 700;
    border-color: #FFFF !important;
    box-shadow: 20px 0px 30px -5px #55747D, -20px 0px 30px 0px #4B5674;
    background-color: #374052;
    transform: translate(-6px)
  }
`

const ButtonContainer = styled.div`
  background: transparent;
  border-radius: 15px;
  padding-top: 19px;
  padding-bottom: 19px;
  border-width: 1px;
  border-color: #313131;
  box-shadow: 0 0 0px;
  border-style: solid;
  // box-shadow: -20px 0px 40px -15px #55747D, 20px 0px 40px -15px #4B5674;
  transition: 0.3s ease-in-out;

  &:hover  {
    // box-shadow: 25px 0px 40px -10px #55747D, -25px 0px 40px -10px #4B5674;
  }
`
const StyledButton = styled.div`
  background: transparent;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: #FFFF solid 0px;
  border-radius: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 25px;
  padding-right: 25px;
  border: 1px;
  border-style: solid !important;
  border-color: transparent;
  transition: 0.3s ease-in-out;
  &:hover  {
    // border-color: #FFFF !important;
    // background: #313131;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    transform: translate(0px);
    border-color: #FFFF !important;
  }
`

export default Nav