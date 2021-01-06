import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const ProfileAbsoluteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  transition: opacity 0.6s ease-in-out;
  animation: shine 0.4s linear;
  @keyframes shine {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
  @media (max-width: 700px) {
    overflow-y: scroll;
  }
  &, * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 42% 29% 29%;
  height: 91vh;
  width: 90%;
  padding: 1.5% 0 0 0;
  @media (max-width: 700px) {
    height: 100%;
    width: 100%;
    padding: 1%;
    grid-template-columns: 100%;
    #slider-column {
      padding: 6rem 2rem 2rem 2rem;
      border-radius: 1rem 1rem 0 0;
    }
    #information-column {
      height: 100%;
      padding: 4rem 2rem 2rem 2rem;
    }
    #map-and-buttons-column {
      height: 100%;
      padding: 2rem;
      border-radius: 0 0 1rem 1rem;
    }
    #close-button {
      display: none;
    }
    #close-button-small-screen {
      display: flex;
    }
    #buttons-container {
      display: none;
    }
    #buttons-container-small-screen {
      display: flex;
    }
    #map-area {
      height: 40rem;
    }
  }
  @media (min-width: 701px) and (max-width: 820px) {
    height: 100%;
    width: 100%;
    padding: 6% 1% 1% 1%;
  }
  @media (min-width: 821px) and (max-width: 1035px) {
    padding: 1% 0 0 0;
  }
  @media (max-width: 1120px) {
    #name {
      font-size: 2.5rem;
    }
  }
`
export const SliderColumn = styled.div`
  height: 85vh;
  padding: 2rem 0 2rem 1.8rem;
  border-radius: 1rem 0 0 1rem;
  background: ${props => props.theme.white};
  &:hover {
    .favorite-button {
      opacity: 1;
    }
  }
  .slick-dots li.slick-active button:before {
    color: ${props => props.theme.primary};
  }
  .slick-dots {
    bottom: 2rem;
      button:before {
      border-style: solid;
      border-color: white;
      border-radius: 50%;
      border-width: 2px;
      height: 12px;
      width: 12px;
      content: "";
      background: ${props => props.theme.primary};
    }
  }
  .slick-dots li button:focus:before {
    opacity: 0.25;
  }
  .slick-dots li.slick-active button:focus:before,  .slick-dots li button:hover:before {
    opacity: 1;
  }
`
export const InformationColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 85vh;
  padding: 2rem 1rem 1.5rem 1rem;
  background: ${props => props.theme.white};
`
export const MapAndButtonsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 85vh;
  padding: 2rem 2rem 2rem 1rem;
  border-radius: 0 1rem 1rem 0;
  background: ${props => props.theme.white};
`
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  position: absolute;
  z-index: 55;
  top: 2rem;
  right: 2rem;
  outline: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: transparent;
  img {
    height: 100%;
  }
`
export const CloseButtonSmallScreen = styled(CloseButton)`
  right: 3rem;
  display: none;
`
export const PhotoDiv = styled.div`
  height: 80.2vh;
  position: relative;
  border-radius: 1.5rem;
  margin-right: 0.5rem;
`
export const FavoriteCircleButton = styled.button`
  display: flex;
  height: 6rem;
  width: 6rem;
  align-items: center;
  justify-content: center;
  z-index: 99999999999;
  right: 3rem;
  top: 1rem;
  margin: 1.5rem 1.5rem 0 0;
  position: absolute;
  outline: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  background: rgba(255, 255, 255, 0.3);
  @media (max-width: 1024px) {
    opacity: 1;
  }
`
export const FavoriteIcon = styled.img`
  margin-top: 0.3rem;
  height: 65%;
`
export const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
`
const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 5rem;
  position: absolute;
  top: 0;
  outline: none;
  cursor: pointer;
  border-width: 0;
  padding: 0;
  background: rgba(0,0,0,0.03);
  img {
    width: 60%;
  }
  animation: shine 0.6s linear;
  @keyframes shine {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
`
export const RightArrowButton = styled(ArrowButton)`
  right: 0;
  border-radius: 0 1rem 1rem 0;
`
export const LeftArrowButton = styled(ArrowButton)`
  left: 0;
  z-index: 50;
  border-radius: 1rem 0 0 1rem;
`
export const PetInformationContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  #inf {
    margin-bottom: 0.5rem;
  }
`
export const NameText = styled.p`
  font-size: 3rem;
  font-weight: bolder;
  color: ${props => props.theme.primary};
`
export const LocationContent = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
  flex-direction: row;
`
export const LocationTextDiv = styled.div`
  justify-content: center;
`
export const LocationIcon = styled.img`
  height: 3rem;
  margin: 0 0.75rem 0 -0.25rem;
  align-self: center;
`
export const PhoneGenderBreedContent = styled.div`
  display: flex;
  margin: 1rem 0 1rem 0;
  align-items: center;
  flex-direction: row;
`
export const PawPhoneIcons = styled.img`
  height: 2.5rem;
  margin-right: 1rem;
`
export const AboutContainer = styled.div`
  max-height: 44%;
  overflow-y: auto;
  margin: 2rem 0 0 0;
  color: ${props => props.theme.dark_grey};
`
export const Text = styled.p`
  word-wrap: break-word;
  margin: 0;
  color: ${props => props.theme.dark_grey};
`
export const ButtonsContainer = styled.div`
  display: flex;
  height: 45%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const ButtonsContainerSmallScreen = styled(ButtonsContainer)`
  display: none;
  height: 20rem;
  padding: 0 2rem 0 2rem;
  button {
    width: 20%;
  }
`
export const OnlyUserOptionsButtons = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 30%;
  outline: none;
  border: 0;
  cursor: pointer;
  background: transparent;
`
export const OnlyUserOptionsButtonsIcons = styled.img`
  width: 80%;
`
const ButtonsTexts = styled.p`
  margin-top: 1rem;
  font-size: 1.55rem;
  font-weight: bold;
`
export const EditText = styled(ButtonsTexts)`
  color: ${props => props.theme.black};
`
export const DeleteText = styled(ButtonsTexts)`
  color: ${props => props.theme.red};
`
export const AlreadyRescuedText = styled(ButtonsTexts)`
  color: ${props => props.theme.green};
`
export const MapArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 55%;
`
export const MapContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 1px 1px 6px 0px ${props => props.theme.shadow};
`
export const MarkerImage = styled.img`
  height: 5rem;
`