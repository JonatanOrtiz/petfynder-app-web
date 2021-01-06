import styled from 'styled-components'

export const PasswordInputDiv = styled.div`
  display: flex;
  height: 4rem;
  width: 35rem;
  align-items: center;
`
export const InputStyled = styled.input`
  flex-grow: 1;
  height: 100%;
  border-width: 0px;
  padding-left: 15px;
  border-radius: 8px;
  color: ${props => props.theme.black};
  outline: none;
  font-size: 1.5rem;
  border-width: 0px;
  background: ${props => props.theme.white};
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  ::selection{
    color: white;
    background: ${props => props.theme.primary};
  }
  ::-moz-selection{
    color: white;
    background: ${props => props.theme.primary};
  }
  ::placeholder { 
  color: ${props => props.theme.input_text_grey};
  opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${props => props.theme.input_text_grey};
  }
  ::-ms-input-placeholder 
    {
    color: ${props => props.theme.input_text_grey};
  }
`
export const ShowBlockPasswordButton = styled.button`
  height: 100%;
  width: 5rem;
  border-width: 0;
  cursor: pointer;
  outline:none;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`
export const ShowBlockPasswordIcon = styled.img`
  margin: 5% 0 0 1rem;
  height: 90%;
`
