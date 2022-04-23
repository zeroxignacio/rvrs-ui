import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Page = styled(Container)`
  min-height: calc(100vh - 220px);
  max-width: 570px;
  padding-top: 30px;
  transition: all 0.5s ease-in-out;

  @media screen and (min-width: 2000px) {
    max-width: 650px;
  }
`

export default Page
