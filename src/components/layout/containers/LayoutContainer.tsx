import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const LayoutContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    background: #121212;
    background: linear-gradient(45deg, #111111, #121212 50%);
    padding: 10px;
    border-width: 1px;
    border-color: #313131;
    border-style: solid;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
`

export default LayoutContainer 