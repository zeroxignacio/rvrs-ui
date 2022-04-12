import styled from 'styled-components'

const claimButtonDisabled = styled.button`
    min-width: 110px;
    padding: 12px;
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 18px;
    border: 0px;
    opacity: 0.9;
    transition: 0.3s ease-in-out;
    :hover {
        cursor: not-allowed;
    }
`

export default claimButtonDisabled