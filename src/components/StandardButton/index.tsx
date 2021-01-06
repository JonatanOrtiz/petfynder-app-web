import React from 'react'
import { LoginButton, LoginButtonText } from './styles'

interface IButtonProps {
  title: string;
  handleClick: (e: any) => void;
}

export default function StandardButton({ title, handleClick }: IButtonProps) {
  return (
    <>
      <LoginButton id="standard-button" type='submit'
        onClick={(e) => handleClick(e)}>
        <LoginButtonText>{title}</LoginButtonText>
      </LoginButton>
    </>
  )
}
