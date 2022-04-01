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

        <StyledButton
          as={StyledNavLink}
          to="/upcoming"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/upcoming')
          }>veRVRS
        </StyledButton>
        <StyledButton
          as={StyledNavLink}
          to="/upcoming"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/upcoming')
          }>Staking
        </StyledButton>
        <StyledButton
          as={StyledNavLink}
          to="/bonds"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/bonds')
          }
        >Bonds
        </StyledButton>
        <StyledButton
          as={StyledNavLink}
          to="/airdrop"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/airdrop')
          }>Airdrop
        </StyledButton>
      </ButtonGroup>
      <ButtonGroup>
        {account != null && account.length > 1 ?
          <Flex style={{alignItems:'center'}}>
            <ChainButton style={{marginRight:'5px'}}>
              <Flex alignItems="center">
                <object type="image/svg+xml" data="/images/hmny.svg" width="20px">&nbsp;</object>&nbsp;Harmony
              </Flex>
            </ChainButton>
            <ConnectedButton
              style={{ justifyContent: "space-between" }}
              as={StyledNavLink}
              to="/upcoming"
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/upcoming')
              }>
              <Flex alignItems="center">
                <object type="image/svg+xml" data="/images/hmny.svg" width="0px">&nbsp;</object>
                <div style={{ marginLeft: '0px', marginRight: '7px' }}>{account.substring(0, 6)} </div>
                <ActivePulse style={{ marginRight: '0px' }} />
              </Flex>
            </ConnectedButton>
          </Flex>
          :
          <Flex style={{alignItems:'center'}}>
            <ChainButton style={{marginRight:'5px'}}>
              <Flex alignItems="center">
                <object type="image/svg+xml" data="/images/hmny.svg" width="20px">&nbsp;</object>&nbsp;Harmony
              </Flex>
            </ChainButton>
          <ConnectedButton
            as={StyledNavLink}
            to="/upcoming"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/upcoming')
            }
            disabled={rvrs.isLocked.unlockWalletButton}
            onClick={onPresentConnectModal} {...props}>
            <Flex alignItems="center">
              <div>Connect</div>
            </Flex>
          </ConnectedButton>
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

const ConnectedButton = styled.div`
  background: transparent;
  font-size: 16px;
  font-weight: 500;
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

const ChainButton = styled.div`
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
  border-radius: 8px;
  padding: 8px;
  transition: 0.3s ease-in-out;
`

const activePulse = keyframes`
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
  padding: 5px;
  transition: 0.3s ease-in-out;
  box-shadow: -20px 0px 30px -10px #55747D, 20px 0px 30px -10px #4B5674;
  &:hover  {
    font-weight: 700;
    border-color: #FFFF !important;
    box-shadow: 20px 0px 30px -5px #55747D, -20px 0px 30px 0px #4B5674;
    background-color: # 374052;
    transform: translate(-6px)
  }
`

const StyledButton = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
  transition: 0.3s ease-in-out;
  &:hover  {
    color: #F1F1F1;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    transform: translate(0px);
    border-color: #FFFF !important;
    text-decoration: underline;
  }
`

export default Nav