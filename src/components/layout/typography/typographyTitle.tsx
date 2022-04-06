import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    text-shadow: 2px 2px #6699A3;
  }
  50% {
    text-shadow: 2px 2px #5F6F92;
  }
  100% {
    text-shadow: 2px 2px #6699A3;
  }
`

const typographyTitle = styled.p`
    font-size: 17px;
    font-weight: 800;
    align-items: center;
    display: inline-flex;
    animation: ${pulse} 5s infinite;

`
export default typographyTitle
