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
          <Flex alignItems="start" >
            <a style={{marginLeft:'-5px'}} target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
              <TypographyBold>Docs</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://discord.com/invite/rvrsprotocol" className="nav-links">
              <TypographyBold>Discord</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
              <TypographyBold>Govern</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
              <TypographyBold>Twitter</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="/" className="nav-links">
              <TypographyBold>Audit</TypographyBold>
            </a>
          </Flex>
            { /* <object type="image/svg+xml" data="/images/reverse.svg" width="120px" style={{ marginTop: "-20px" }}>&nbsp;</object> */ }
        </Flex>
        <Typography>2022 Reverse Protocol. MIT License.</Typography>
      </NavContainer>
    </MenuContainer >
  )
}

const TypographyBold = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0px;
  transition: 0.3s;
  text-decoration: underline;
  margin-right: 5px;
  margin-left: 5px;
`

const Typography = styled.p`
    font-size: 12px;
    color: #CFCFCF;
    font-weight: 400;
    margin-top: 15px;
`


const NavContainer = styled(Container)`
  text-align: center;
  padding: 10px;
  max-width: 580px;
`
const MenuContainer = styled(Container)`
  max-width: 10000px;
  padding: 20px;
  background-color: #181818;
  border-width: 1px 0px 0px 0px;
  border-color: #313131;
  border-style: solid;
  margin-top: 30px;
  background-color: rgba(42, 52, 67, 0.6);
  background-color: #121212;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 1;
  }
`

export default MenuBottom
