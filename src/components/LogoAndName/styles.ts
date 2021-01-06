import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const LogoTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  align-items: center;
  `
export const Logo = styled.img`
  height: 17rem;
`
export const LogoTitle = styled.p`
  display: flex;
  font-size: 3rem;
  font-weight: normal;
  color: ${props => props.theme.black};
  text-shadow: -1px 0 ${props => props.theme.white};
  font-family: Pacifico;
`
