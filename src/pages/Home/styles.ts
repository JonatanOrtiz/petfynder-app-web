import styled from 'styled-components'
import '../../assets/styles/fonts.css'
import pawBackground from '../../assets/images/pawBackground.png';

interface Rows {
  rows: string;
}

export const Container = styled.div`
  min-height: 100vh;
  padding: 5rem 0 0 0;
  background: ${props => props.theme.background_primary};
  &, * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`
export const LayerDiv = styled.div`
  height: 96vh;
  min-height: 80rem;
  padding: 4rem 5rem 4rem 5rem;
  h2 {
    font-size: 3rem;
    margin: 9rem 0 9rem 2rem;
    color: ${props => props.theme.input_text_grey};
  }
  #absolute-h2 {
    position: absolute;
    top: 78%;
  }
  @media (max-width: 1009px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    h2 {
      margin: 2rem 0 4rem 0;
      text-align: center;
    }
    #absolute-h2 {
      margin-top: 4rem;
      position: static;
    }
    #pet-profile-card {
      height: 60rem;
      width: 36%;
      margin: 2% 0 2% 8%;
    }
  }
`
export const PetCardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  height: 80vh;
  min-height: 80rem;
  #pet-profile-card {
    height: 40rem;
    width: 29rem;
    margin: 1rem 1rem 50% 1rem;
    * {
      font-size: 102%;
    }
    #name {
      font-size: 2.2rem;
    }
  }
  @media (max-width: 1009px) {
    height: 100%;
    align-items: center;
    justify-content: center;
    #pet-profile-card {
      margin: 2rem;
    }
  }
`
export const RightImagesLayerDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 5rem;
  height: 96vh;
  min-height: 80rem;
  background: ${props => props.theme.white} url(${pawBackground});
  @media (max-width: 1009px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    & > div {
      padding: 5rem;
    }
  }
`
export const LeftImagesLayerDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 8rem;
  height: 96vh;
  min-height: 80rem;
  background: ${props => props.theme.white} url(${pawBackground});
  @media (max-width: 1009px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
    height: 100%;
    & > div {
      padding: 5rem;
    }
  }
`
export const InformationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  flex-wrap: wrap;
  #app-name {
    font-family: Pacifico;
    margin: 4rem;
    font-size: 6.5rem;
  }
  h1 {
    color: ${props => props.theme.primary};
    font-size: 5rem;
    margin: 0.5rem;
  }
  h2 {
    font-size: 4.5rem;
    color: ${props => props.theme.orange};
  }
  h3 {
    font-size: 3rem;
    color: ${props => props.theme.input_text_grey};
  }
  @media (max-width: 1009px) {
    text-align: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
    #flex-start-div {
      h1, h2, h3 {
        margin-left: 0 !important;
      }
    }
  }
  @media (max-width: 1150px) {
    #flex-start-div {
      margin-left: 0 !important;
    }
  }
  @media (max-width: 559px) {
    h1 {
      font-size: 4rem !important;
    }
    h2 {
      font-size: 3rem !important;
    }
    #h3-nowrap {
      text-align: center !important;
    }
  }
`
export const RightImageDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`
export const LeftImageDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`
export const Image = styled.img`
  max-width: 90%;
  min-width: 25rem;
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
  height: 100%;
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
