import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background-image: linear-gradient(90deg, #2D3544, #2E343E);
  border-radius: 30px;
  padding: 10px;
  border: 1px solid !important;
  border-color: #CECECE !important;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #FFFF !important;
  } 
`

export default bondsContainer
