import styled from 'styled-components'

export const FacebookLoginButton = styled.button`
  display: flex;
  height: 4rem;
  width: 35rem;
  cursor: pointer;
  outline:none;
  border-width: 0;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  background-color: rgb(59,89,153);
  &:active {
    background: white;
    p {
      color:  ${props => props.theme.primary};
    }
  }
  transition: background 0.1s;
`
  export const FacebookIcon = styled.img`
  height: 2rem;
  margin-right: 2rem;
`
