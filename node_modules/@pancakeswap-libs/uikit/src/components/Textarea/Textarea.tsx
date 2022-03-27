import styled, { DefaultTheme } from "styled-components";
import { TextareaProps, scales } from "./types";

interface StyledTextareaProps extends TextareaProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledTextareaProps) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  if (isSuccess) {
    return theme.shadows.success;
  }

  return theme.shadows.inset;
};

const getHeight = ({ scale = scales.MD }: StyledTextareaProps) => {
  switch (scale) {
    case scales.SM:
      return "64px";
    case scales.LG:
      return "120px";
    case scales.MD:
    default:
      return "82px";
  }
};

const Textarea = styled.textarea<TextareaProps>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 0;
  border-radius: 12px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 12px 16px;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

Textarea.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
};

export default Textarea;
