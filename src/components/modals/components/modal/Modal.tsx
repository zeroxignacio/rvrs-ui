import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Flex } from "components/layout/flex";
import TypographyTitle from "components/layout/typography/typographyTitle";
import { InjectedProps } from "./types";

interface Props extends InjectedProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  children,
}) => (

  <StyledModal>
    <TitleContainer>
      <Flex justifyContent="space-between">
        <TypographyTitle>{title}</TypographyTitle>
        <DismissButton onClick={onDismiss}>Close</DismissButton>
      </Flex>
    </TitleContainer>
    <Divider />
    <Flex>
      {children}
    </Flex>
  </StyledModal>
)

const Divider = styled.div`
  height: 0px;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 0%;
`

const TitleContainer = styled(Container)`
  background-image: linear-gradient(to right, #3E475E, #4E5E62);
  border-radius: 20px;
  padding: 20px;
`

const StyledModal = styled.div`
  background-image: linear-gradient(#2D3544, #37404E);
  padding: 20px;
  border: 1px solid #FFF;
  border-radius: 25px;
  z-index: 100;
  transition: all 0.3s ease-in-out;
  &:hover  {
    box-shadow: 20px 0px 40px -20px #55747D, -20px 0px 20px -20px #4B5674;
  }

`

const DismissButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #D6D6D6;
  padding: 0px;
  background: none;
  border-radius: 10px;
  border: 0px;
  border-style: solid !important;
  border-color: #5F6C74 !important;
  transition: all 0.3s ease-in-out;
  :hover {
      background: none;
      color: #FFFF;
  } 
`

export default Modal;
