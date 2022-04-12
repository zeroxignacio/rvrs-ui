import styled from 'styled-components'

const bondButtonDisabled = styled.button`
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    color: #EEEEEE;
    min-width: 90px;
    border-left: 5px solid #;
    justify-content: center;
    padding: 10px;
    transition: 0.5s ease-in-out;
    opacity: 0.5;
    :hover {
        background: transparent;
        cursor: not-allowed;
    }
`

export default bondButtonDisabled