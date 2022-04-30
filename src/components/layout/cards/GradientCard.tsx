import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const GradientCard = styled(Container)`
  text-align: center;
  border-radius: 0px;
  background: #191919;
  background-image: linear-gradient(to right, #232525, #252827);
  padding: 13px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.2s ease-in-out;
  width: 120%;
  border-color: #3A3A3A;
  :hover {
    border-color: #515151;
  }
`

export default GradientCard