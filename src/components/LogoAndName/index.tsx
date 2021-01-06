import React from 'react'
import { LogoTitleDiv, Logo, LogoTitle } from './styles'
import logo from '../../assets/images/dogCat.png';

export default function LogoAndName() {
  return (
    <LogoTitleDiv id="logo-and-title-div">
      <Logo id="logo" src={logo} />
      <LogoTitle id="logo-name" >Petfynder</LogoTitle>
    </LogoTitleDiv>
  )
}
