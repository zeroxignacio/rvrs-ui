import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  border-radius: 10px;
  padding: 6px;
  margin-top: 8px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  :hover {
    border-color: #6F6F6F;
  }
`

export default bondsContainer 
