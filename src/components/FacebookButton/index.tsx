import React from 'react';
// import api from '../../services/api';
import facebookIcon from '../../assets/images/facebookIcon.png';
import { LoginButtonText, } from '../../components/StandardButton/styles'
import { FacebookLoginButton, FacebookIcon } from "./styles";

interface IButtonProps {
  title: string;
  handleClick: () => void;
}

export default function FacebookButton({ title, handleClick }: IButtonProps) {

  return (
    <FacebookLoginButton id="facebook-button"
      onClick={handleClick}>
      <FacebookIcon src={facebookIcon} />
      <LoginButtonText>{title}</LoginButtonText>
    </FacebookLoginButton>
  );
}
