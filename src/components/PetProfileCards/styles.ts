import styled from 'styled-components'
import '../../assets/styles/fonts.css'

interface Row {
  row: string;
}

export const PetProfileCardContainerButton = styled.button`
  height: 30rem;
  width: 23rem;
  outline: none;
  cursor: pointer;
  border-radius: 1rem;
  border: 0;
  padding: 0;
  margin: 0 1rem 2rem 0;
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  background: transparent;
  &:hover {
    box-shadow: 2px 5px 10px 5px ${props => props.theme.shadow};
    transition: box-shadow 0.3s;
    #favorite-circle-button {
      opacity: 1;
    }
  }
`
export const ProfileImgContainer = styled.div`
  display: flex;
  height: 64%;
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
export const FavoriteCircleButton = styled.button`
  display: flex;
  height: 5rem;
  width: 5rem;
  align-items: center;
  justify-content: center;
  right: 0;
  margin: 1.5rem 1.5rem 0 0;
  position: absolute;
  outline: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  @media (max-width: 1024px) {
    opacity: 1;
    background: rgba(255, 255, 255, 0.3);
  }
`
export const FavoriteIcon = styled.img`
  margin-top: 0.17rem;
  height: 65%;
`
export const ProfileContentDiv = styled.div<Row>`
  display: grid;
  height: 36%;
  overflow: hidden;
  grid-template-rows: ${props => props.row} 33% 37%;
  border-radius: 0 0 1rem 1rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  background: ${props => props.theme.white};
`
export const NameText = styled.p`
  height: 100%;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bolder;
  color: ${props => props.theme.primary};
`
export const IconsTextDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: start;
`
export const AddressDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  text-align: start;
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
  font-size: 1.3rem;
  color: ${props => props.theme.dark_grey};
`
