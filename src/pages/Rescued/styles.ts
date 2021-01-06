import styled from 'styled-components'
import '../../assets/styles/fonts.css'

interface Rows {
  rows: string;
}

export const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 5% 2% 5%;
  background: ${props => props.theme.background_primary};
  h1 {
    font-size: 2.7rem;
    margin: 0 0 5rem 0;
    color: ${props => props.theme.input_text_grey};
  }
  &, *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    :focus {outline:none !important;}
  }
`
export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: ${props => props.theme.background_primary};
`
export const PetProfileContainerDiv = styled.div`
  height: 37rem;
  width: 28rem;
  min-width: 28rem;
  border-radius: 1rem;
  border: 0;
  padding: 0;
  margin: 0 1rem 2rem 1rem;
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  @media (max-width: 530px) {
    width: 80%; 
  }
`
export const ProfileImgContainer = styled.div`
  display: flex;
  height: 58%;
  width: 100%;
  position: relative;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  &:after {
    content: "";
    width: 100%;
    height: 1rem;
    bottom: 0;
    border-radius: 50% 50% 0 0;
    position: absolute;
    background: ${props => props.theme.white};
  }
`
export const ProfileImg = styled.img`
  height: 99.5%;
  width: 100%;
  object-fit: cover;
`
export const ProfileContentDiv = styled.div<Rows>`
  display: grid;
  height: 42%;
  overflow: hidden;
  grid-template-rows: ${props => props.rows};
  border-radius: 0 0 1rem 1rem;
  padding: 0 2rem 1.5rem 2rem;
  background: ${props => props.theme.white};
`
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NameText = styled.p`
  height: 100%;
  margin: 0;
  font-size: 2.5rem;
  font-weight: bolder;
  color: ${props => props.theme.primary};
`
export const IconsTextDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`
export const AddressDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`
export const ProfilesIcons = styled.img`
  margin: 0 1rem 0 0;
  width: 2rem;
  align-self: center;
`
export const AddressText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${props => props.theme.dark_grey};
`
