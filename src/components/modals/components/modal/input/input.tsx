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
  background: #F2F2F2;
  border-radius: 2px;
  display: flex;
  padding: 0px;
  padding-left: 10px;
`

const StyledInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  background: none;
  border: 0;
  color: black;
`

export default Input
