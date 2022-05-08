import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Wrap = styled(Container)`
border-radius: 7px;
padding: 2px;
border-width: 1px;
border-color: #3a3a3a;
border-style: solid;
box-shadow: 0px 25px 25px -35px #55747d, 0px -25px 25px -35px #55747d;
:hover {
  box-shadow: 25px 25px 40px -45px #55747d, -25px -25px 40px -45px #6699a3;
}
transition: all 0.3s ease-in-out;
`

export default Wrap