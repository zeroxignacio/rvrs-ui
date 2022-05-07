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
            <Typography>make sure you are using https://rvrs.app, bookmark it to be safe</Typography>
          </Flex>
        </Flex>
      </NavContainer>
    </MenuContainer >
  )
}

const Typography = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0px;
  margin-right: 5px;
  margin-left: 5px;
  transition: 0.3s ease-in-out;
`

const NavContainer = styled(Container)`
  text-align: center;
  padding: 3px;
`
const MenuContainer = styled(Container)`
  max-width: 10000px;
  background-color: #191919;
  border-width: 0 0 1px;
  border-color: #4A4A4A;
  border-style: solid;
  cursor: help;
`

export default MenuBottom
