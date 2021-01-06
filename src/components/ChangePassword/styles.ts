import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  #loading-screen {
    height: 100%;
    width: 100%;
    position: absolute;
    top: -1rem;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
  }
  #logo-and-title-div {
    margin-bottom: 2rem;
  }
  div {
    margin: 1rem 0 1rem 0;
  }
  #standard-button {
    height: 4.5rem;
    width: 100%;
    margin: 0.5rem 0 1rem 0;
  }
  #message-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      color: ${props => props.theme.black};
      font-size: 2rem;
      margin: 0;
    }
  }
  &:after {
    height: 20%;
    content: ""
  }
`
export const ErrorMessage = styled.p`
  height: 2rem;
  margin: 0;
  color: ${props => props.theme.red};
`