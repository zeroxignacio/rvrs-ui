import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 0px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  :hover {
    border-color: #262626;
    background: #161616;
  }
`

export default bondsContainer 
