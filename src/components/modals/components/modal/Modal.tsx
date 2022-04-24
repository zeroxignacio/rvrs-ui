import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Flex } from "components/layout/flex";
import TypographyTitle from "components/layout/typography/typographyTitle";
import TypographyBold from "components/layout/typography/typographyBold";
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
  <ModalContainerWrap>
    <ModalContainer>
      <TitleContainer>
        <Flex justifyContent="space-between">
          <TypographyBold>{title}</TypographyBold>
          <DismissButton onClick={onDismiss}>Close</DismissButton>
        </Flex>
      </TitleContainer>
      <Divider />
      <Flex>
        {children}
      </Flex>
    </ModalContainer>
  </ModalContainerWrap>
)

const Divider = styled.div`
  height: 0px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 0%;
`

const ModalContainer = styled.div`
  background: #121212;
  border-radius: 4px;
  padding: 10px;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
  z-index: 100;
`

const ModalContainerWrap = styled.div`
background: linear-gradient(145deg, 
  #060606, 
  #121212 0%,
  #060606 50%, 
  #0D0D0D 50%, 
  #121212 50%
  );
  padding: 4000px;
  z-index: 100;
`

const TitleContainer = styled(Container)`
  background: #161616;
  padding: 5px;
  padding-left: 10px;
  border-width: 1px;
  border-color: #313131;
  border-style: solid;
`

const DismissButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: #D6D6D6;
  padding: 10px;
  background: none;
  border: 0px;
  transition: all 0.3s ease-in-out;
  :hover {
      background: none;
      opacity: 0.6;
  } 
`

export default Modal;
