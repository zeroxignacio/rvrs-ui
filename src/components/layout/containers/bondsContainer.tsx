import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  border-radius: 5px;
  padding: 5px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  margin-right: 3px;
  :hover {
    border-color: #3A3A3A;
    background: #181818;
    // box-shadow 10px 10px 5px -9px #2C2C2C;
  }

`

export default bondsContainer
