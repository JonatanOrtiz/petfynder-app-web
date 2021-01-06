import styled from 'styled-components';
import '../../assets/styles/fonts.css';
import { shade } from "polished";

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 8rem;
  z-index: 99;
  align-items: center;
  border-width: 0 0 0.3rem;
  border-style: solid;
  padding: 0 5% 0 5%;
  border-bottom-color: ${props => shade(0.15, props.theme.primary)};
  background: ${props => props.theme.primary};
  &, *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
  @media(max-width: 559px) {
    padding: 0 1.5% 0 1.5%;
  }
`
export const LogoButton = styled.button`
  height: 100%;
  outline:none;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
`
export const LogoTitle = styled.p`
  font-size: 2.6rem;
  font-family: Pacifico;
  color: white;
  font-weight: 400;
  text-shadow: -1px 0 black;
`
export const NavDiv = styled.ul`
  height: 100%;
  width: 100%;  
  display: flex;
  align-items: center;
  justify-content: flex-end;
  li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem 0 2rem;
  }
  a, button {
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    outline:none;
    border: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`
export const HeaderIcons = styled.img`
  height: 2.5rem;
`
export const MenuButton = styled.button`
  margin: 0 -2.5rem 0 2rem;
  height: 100%;
  outline:none;
  border: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 0 2rem;
  @media(max-width: 559px) {
    margin-right: -0.8rem;
  }
`
export const CloseButton = styled(MenuButton)`
  border: 0;
  height: 8.5rem;
  margin-bottom: -1rem;
  background: ${props => props.theme.grey} !important;
`
export const MenuOptionsDiv = styled.div`
  display: flex;
  width: 50%;
  z-index: 990;
  margin-left: 50%;
  outline:none;
  top: 8rem;
  flex-direction: column;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.white};
  li {
    height: 8rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: ${props => props.theme.grey};
    border-width: 0 0 1px 1px;
    border-bottom-style: solid;
    border-left-style: solid;
  }
  a, button {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.theme.black};
    outline:none;
    border: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`
