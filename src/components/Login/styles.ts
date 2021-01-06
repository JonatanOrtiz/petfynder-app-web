import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.absolute_background};
  background-attachment: fixed;
  opacity: 1;
  animation: shine 0.4s linear;
  &, *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
  #loading-screen {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
  }
  @keyframes shine {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
  transition: opacity 0.6s;
  #logo-and-title-div {
    margin: 1rem 0 1rem 0;
  }
  #email-input-div {
    margin: 2rem 0 1.5rem 0;
  }
  #password-input-div {
    margin: 1rem 0 1rem 0;
  }
  #standard-button {
    height: 4.5rem;
    width: 100%;
    margin: 1rem 0 1rem 0;
  }
  #division-line {
    margin: 0 1rem 0 1rem;
    color: ${props => props.theme.dark_grey};
  }
  #token-input-div {
    display: flex;
    height: 4rem;
    width: 35rem;
    margin: 2rem 0 1.5rem 0;
  }
`
export const InternalDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: auto;
  width: auto;
  max-width: 40rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding: 0.5rem 2rem 2.5rem 2rem;
  background: ${props => props.theme.background_primary};
  @media (max-width: 500px) {
    height: 100%;
    width: 100%;
    padding: 0 1rem 0 1rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    #logo-and-title-div {
      margin-top: -2rem;
    }
    #logo {
      height: 12rem;
    }
    #logo-name {
      font-size: 2rem;
    }
    #email-input-div {
      width: 100%;
      min-width: 28rem;
      max-width: 28rem;
      margin-bottom: 0;
    }
    #password-input-div {
      width: 100%;
      min-width: 28rem;
      max-width: 28rem;
      margin-bottom: 0;
    }
    #standard-button {
      width: 100%;
      min-width: 28rem;
      max-width: 28rem;
    }
    #facebook-button-div {
      width: 100%;
      min-width: 28rem;
      max-width: 28rem;
    }
    #forgot-password-div {
      display: flex;
      flex-direction: column;
    }
    #division-line {
      display: none;
    }
    #token-input-div {
      width: 100%;
    }
  }
`
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  position: absolute;
  z-index: 55;
  top: 2rem;
  right: 2rem;
  outline: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: transparent;
  img {
    height: 100%;
  }
`
export const ErrorMessage = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${props => props.theme.red};
`
export const ForgotPasswordLoginDiv = styled.div`
  display: grid;
  width: 35rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  grid-template-columns: 48% 4% 48%;
  button {
    outline: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    justify-self: center;
    color: ${props => props.theme.blue};
    background: transparent;
  }
  p {
    justify-self: center;
  }
`
export const FacebookIcon = styled.img`
  height: 2rem;
  margin-right: 2rem;
`
export const FacebookButtonDiv = styled.div`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;    
  position: relative;
  width: 100%;
  color: white;
  font-weight: bold;
  border-radius: 1rem;
  margin: 1rem 0 1rem 0;
  align-items: center;
  justify-content: center;
  background-color: rgb(59,89,153);
  &:active {
    opacity: 0.5;
  }
  transition: opacity 0.1s;
`
export const OrDiv = styled.div`
  display: flex;
  width: 35rem;
  align-items: center;
  justify-content: center;
`
export const OrText = styled.p`
  font-size: 2rem;
  font-style: italic;
  color: ${props => props.theme.dark_grey};
`
