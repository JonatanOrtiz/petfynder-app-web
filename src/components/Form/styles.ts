import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const Container = styled.div`
  margin-top: -0.6rem;
`
export const Input = styled.input`
  height: 4.5rem;
  width: 95%;
  margin: 0.6rem 0 0.6rem 0;
  color: ${props => props.theme.black};
  outline: none;
  font-size: 1.5rem;
  border-width: 0px;
  padding-left: 15px;
  border-radius: 8px;
  background: ${props => props.theme.white};
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  cursor: auto;
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
  @media (max-width: 788px) {
    height: 5.5rem;
  }
`
export const TextAreaDiv = styled.div`
  width: 95%;
  margin: 1.5rem 0 1.5rem 0;
`
export const TextArea = styled.textarea`
  height: 100%;
  width: 100%;
  color: ${props => props.theme.black};
  outline: none;
  resize: none;
  border-width: 0px;
  padding: 15px;
  border-radius: 8px;
  background: ${props => props.theme.white};
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  cursor: auto;
  ::selection{
    color: white;
    background: ${props => props.theme.primary};
  }
  ::-moz-selection{
    color: white;
    background: ${props => props.theme.primary};
  }
`
