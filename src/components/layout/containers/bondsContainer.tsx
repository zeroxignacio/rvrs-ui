import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  :hover {
    border-color: #ffffff;
  }
`

export default bondsContainer
