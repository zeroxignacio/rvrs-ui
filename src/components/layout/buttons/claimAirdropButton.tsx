import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
  50% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  100% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
`

const claimAirdropButton = styled.button`
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    color: #EEEEEE;
    min-width: 90px;
    border-left: 5px solid #;
    justify-content: center;
    padding: 10px;
    transition: 0.5s ease-in-out;
    animation: ${pulse} 3s infinite ease-out;
    :hover {
        opacity: 0.5;
        background: transparent;
    } 

`

export default claimAirdropButton