import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Toggle, useModal } from '@pancakeswap-libs/uikit'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

const MenuBottom = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MenuContainer>
      <NavContainer>
        <Flex justifyContent="space-between" marginTop="10px">
          <Flex flexDirection="column" alignItems="start" >
            <a style={{ marginBottom: "14px" }} target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
              <TypographyBold>Docs</TypographyBold>
            </a>
            <a target="_blanK" rel="noreferrer" href="https://discord.com/invite/rvrsprotocol" className="nav-links">
              <TypographyBold>Discord</TypographyBold>
            </a>
          </Flex>
          <Flex flexDirection="column" alignItems="start" marginLeft="-80px">
            <a style={{ marginBottom: "14px" }} target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
              <TypographyBold>Govern</TypographyBold>
            </a>
            <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
              <TypographyBold>Twitter</TypographyBold>
            </a>
          </Flex>
          <Flex flexDirection="column" alignItems="start" marginLeft="-80px">
            <a style={{ marginBottom: "14px" }} target="_blanK" rel="noreferrer" href="https://medium.com/@reverseprotocolONE" className="nav-links">
              <TypographyBold>Medium</TypographyBold>
            </a>
            <a target="_blanK" rel="noreferrer" href="https://t.me/ReverseProtocolOne" className="nav-links">
              <TypographyBold>Telegram</TypographyBold>
            </a>
          </Flex>
          <Link to="/">
            <object type="image/svg+xml" data="/images/reverse.svg" width="150px" style={{ marginTop: "-5px" }}>&nbsp;</object>
          </Link>
        </Flex>
      </NavContainer>
    </MenuContainer >
  )
}

const TypographyBold = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 0px;
  transition: 0.3s;
`

const NavContainer = styled(Container)`
  text-align: center;
  padding: 20px;
  max-width: 590px;
`
const MenuContainer = styled(Container)`
  padding-bottom: 10px;
  background-color: rgba(42, 52, 67, 0.6);
  transition: all 0.3s ease-in-out;
  :hover {
    background-color: rgba(42, 52, 67, 1);
  }
  max-width: 4000px;
`

export default MenuBottom
