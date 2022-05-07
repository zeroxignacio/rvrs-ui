import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const GradientCard = styled(Container)`
  text-align: center;
  border-radius: 0px;
  background: #191919;
  background-image: linear-gradient(45deg, #3A3A3A, #4A4A4A, #333333);
  padding: 13px;
  border-width: 0px 1px 1px 0;
  border-style: solid;
  transition: all 0.2s ease-in-out;
  box-shadow: 2px 2px 0 0 #808080;
  width: 140%;
  border-color: black;
  :hover {
    box-shadow: 2px 2px 0 0 #A5A5A5;
  }
`

export default GradientCard