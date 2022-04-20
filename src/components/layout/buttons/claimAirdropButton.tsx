import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    text-shadow: 1px 1px 0px #6699A3;
  }
  50% {
    text-shadow: 2px 2px 0px #5F6F92 inline;
  }
  100% {
    text-shadow: 1px 1px 0px #6699A3;
  }
`


const claimAirdropButton = styled.button`
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    color: #EEEEEE;
    border-left: 5px solid #6699A3;
    padding: 10px;
    transition: 0.5s ease-in-out;
    :hover {
        opacity: 0.5;
        //animation: ${pulse} 2s infinite;
        background: transparent;
    } 
`


export default claimAirdropButton