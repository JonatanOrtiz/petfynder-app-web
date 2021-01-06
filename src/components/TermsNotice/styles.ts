import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;  
  justify-content: center;
  padding: 1rem 2rem 1rem 2rem;
  min-height: 6rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  color: ${props => props.theme.black};
  background: ${props => props.theme.grey};
  &, * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
  p {
    margin: 0;
  }
  #close-terms-notice {
    margin-left: 2rem;
    outline: none;
    font-weight: bolder;
    border-style: solid;
    border-radius: 0.5rem;
    color: #a0a0a0;
    border-color: #a0a0a0;
    cursor: pointer;
    background: transparent;
    padding: 1px 5px 0 5px;
    &:hover {
      border-color: white;
      background: white;
    }
  }
`
