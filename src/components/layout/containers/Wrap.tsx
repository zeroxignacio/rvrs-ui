import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Wrap = styled(Container)`
    border-radius: 7px;
    padding: 2px;
    border-width: 1px;
    border-color: #313131;
    border-style: solid;
    box-shadow: 5px 5px 30px -22px #55747d;
    transition: all 0.3s ease-in-out;
    :hover {
        box-shadow: 5px 5px 30px -18px #55747d;
    }
`

export default Wrap