import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.absolute_background};
  background-attachment: fixed;
  transition: opacity 0.4s ease-in-out;
  animation: shine 0.4s linear;
  @keyframes shine {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
  #alert-internal-div {
    display: flex;
    width: 40rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 2.5rem;
    color: ${props => props.theme.dark_grey};
    background: ${props => props.theme.background_primary};
    box-shadow: 0px 0px 3px 0px ${props => props.theme.shadow};
  }
  button {
    margin: 0.5rem 1rem 0.5rem 1rem;
    height: 3rem;
    width: 11rem;
    border-style: solid;
    border-radius: 5px;
    border-width: 2px;
    outline: none;
    cursor: pointer;
    padding: 2px 0 2px 0;
    color: ${props => props.theme.red_cancel};
    border-color: ${props => props.theme.red_cancel};
    background: transparent;
    &:hover {
      color: white;
      background: ${props => props.theme.red_cancel};
    }
    &:active {
      opacity: 0.5;
    }
  }
  button + button {
    color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    
    &:hover {
      color: white;
      background: ${props => props.theme.primary};
      
    }
  }
`