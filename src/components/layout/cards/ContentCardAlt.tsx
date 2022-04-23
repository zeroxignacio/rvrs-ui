import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const ContentCardAlt = styled(Container)`
  text-align: center;
  border-radius: 0px;
  padding: 10px;
  border-width: 1px;
  border-color: #3A3A3A;
  border-style: solid;
  transition: all 0.2s ease-in-out;
  :hover {
    border-color: #515151;
  }
`

export default ContentCardAlt