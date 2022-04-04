import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  return (
    <InputWrapper>
      <StyledInput placeholder="0.00" value={value} onChange={onChange} />
      {endAdornment}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  align-items: center;
  background-image: linear-gradient(to right, #F2F2F2, #CCCCCC);
  border-radius: 0px;
  display: flex;
  height: 50px;
  padding: 5px;
  border: 0px;
  border-style: solid !important;
  border-color: #A8A8A8 !important;
`

const StyledInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  background: none;
  border: 0;
  color: #2D3544;
`

export default Input
