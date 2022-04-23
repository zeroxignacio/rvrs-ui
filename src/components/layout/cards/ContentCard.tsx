import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const ContentCard = styled(Container)`
  text-align: center;
  border-radius: 0px;
  background: #191919;
  padding: 15px;
  border-width: 1px;
  border-color: transparent;
  border-style: solid;
  transition: all 0.2s ease-in-out;
  :hover {
    border-color: #3A3A3A;
  }
`

export default ContentCard