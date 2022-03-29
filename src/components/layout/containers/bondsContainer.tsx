import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background-image: linear-gradient(90deg, #2D3544, #2E343E);
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
`

export default bondsContainer
