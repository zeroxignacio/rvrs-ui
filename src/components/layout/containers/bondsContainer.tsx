import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const BondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  border-radius: 5px;
  padding: 6px;
  margin-top: 8px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  :hover {
    border-color: #262626;
    background: #161616;
  }
`

export default BondsContainer 
