import styled from 'styled-components'

export const LoginButton = styled.button`
  height: 4rem;
  cursor: pointer;
  outline:none;
  border-width: 0;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: ${props => props.theme.primary};
  &:active {
    background: white;
    p {
      color:  ${props => props.theme.primary};
    }
  }
  transition: background 0.1s;
`
export const LoginButtonText = styled.p`
  color: white;
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
  transition: color 0.1s
`
