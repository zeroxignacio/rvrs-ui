import styled from 'styled-components'

const bondButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    color: #EEEEEE;
    padding: 12px;
    justify-content: center;
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 15px;
    border: 0px;
    box-shadow: 0px 0px 10px #506063;
    min-width: 110px;  
    transition: 0.3s ease-in-out;
 
    :hover {
        background-image: linear-gradient(#5E7073, #909BBF);
        color: #FFFF;
    } 
`

export default bondButton