import styled from 'styled-components'

export const LoginButton = styled.button`
  height: 4rem;
  cursor: pointer;
  outline:none;
  border-width: 0;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0;
  &:hover {
    background: ${props => props.theme.primary};
    p {
      color: white;
    }
  }
`
export const LoginButtonText = styled.p`
  color: ${props => props.theme.primary};
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
`
