import React from 'react'
import { LoginButton, LoginButtonText } from './styles'

interface IButtonProps {
  title: string;
  handleClick: () => void;
}

export default function StandardButton({ title, handleClick }: IButtonProps) {
  return (
    <>
      <LoginButton id="standard-button" type='submit'
        onClick={handleClick}>
        <LoginButtonText>{title}</LoginButtonText>
      </LoginButton>
    </>
  )
}
