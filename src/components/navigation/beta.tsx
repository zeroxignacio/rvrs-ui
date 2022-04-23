import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@reverse/uikit'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

const MenuBottom = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MenuContainer>
      <NavContainer>
        <Flex justifyContent="center" marginTop="0px">
          <Flex alignItems="center" >
            <TypographyBold>rvrs.app is on release v0.1, please use at your own risk</TypographyBold>
          </Flex>
        </Flex>
      </NavContainer>
    </MenuContainer >
  )
}

const TypographyBold = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0px;
  margin-right: 5px;
  margin-left: 5px;
  transition: 0.3s ease-in-out;
`

const NavContainer = styled(Container)`
  text-align: center;
  padding: 5px;
`
const MenuContainer = styled(Container)`
  max-width: 10000px;
  background-color: #B40000;
  cursor: help;
`

export default MenuBottom
