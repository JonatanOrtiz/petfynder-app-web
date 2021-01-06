import React from "react"
import { useSelector, useDispatch } from "react-redux"
import malePawIcon from "../../assets/images/malePawIcon.png"
import femalePawIcon from "../../assets/images/femalePawIcon.png"
import redPinIcon from "../../assets/images/redPinIcon.png"
import purpleFavoriteIcon from "../../assets/images/purpleFavoriteIcon.png"
import emptyFavoriteIcon from "../../assets/images/emptyFavoriteIcon.png"
import { RootState } from "../../store"
import Login from "../Login"
import api from "../../services/api"
import {
  PetProfileCardContainerButton, ProfileImgContainer, ProfileImg, ProfileContentDiv, NameText, IconsTextDiv,
  AddressDiv, ProfilesIcons, AddressText, FavoriteCircleButton, FavoriteIcon
} from "./styles"

interface Pet {
  _id: string;
  name: string;
  breed: string;
  state: string;
  city: string;
  district: string;
  street: string;
  phone: string;
  contactName: string;
  animal: string;
  gender: string;
  photos: string[];
  about: string;
  colors: string[];
  location: {
    coordinates: number[];
  }
  user: string;
  updatedAt: string;
}

const s3Link = "https://petfynderimages.s3-sa-east-1.amazonaws.com/"

export default function PetProfileCards({ from, to }: { from: number, to: number }) {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();

  const changeFavorite = (_id: string, name: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (appStore.userId) {
      appStore.favorites.includes(_id) ? undoFavorite(_id, name) : setFavorite(_id, name);
    }
    else {
      dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: true });
    }
  }

  const setFavorite = async (_id: string, name: string) => {
    if (name) {
      api.put(`user/lost/${appStore.userId}`, { petId: _id, favorite: "makeFavorite" });
    } else {
      api.put(`user/found/${appStore.userId}`, { petId: _id, favorite: "makeFavorite" });
    }
    dispatch({ type: "SET_FAVORITES", payload: [...appStore.favorites, _id] });
  }

  async function undoFavorite(_id: string, name: string) {
    if (name) {
      api.put(`user/lost/${appStore.userId}`, { petId: _id, favorite: 'undoFavorite' });
    } else {
      api.put(`user/found/${appStore.userId}`, { petId: _id, favorite: 'undoFavorite' });
    }
    const favorites = appStore.favorites!.filter((item: string) => item !== _id);
    dispatch({ type: "SET_FAVORITES", payload: favorites });
  }

  return (
    <>
      {appStore.pets.slice(from, to).map((pet: Pet, index: number) => (
        <PetProfileCardContainerButton id="pet-profile-card" key={index}
          onClick={() => [dispatch({ type: "SET_SHOW_PET_PROFILE", payload: true }), dispatch({ type: "SET_PET_INDEX", payload: from + index })]}>
          <ProfileImgContainer>
            <ProfileImg src={s3Link + pet.photos[0]} />
            <FavoriteCircleButton id="favorite-circle-button"
              onClick={(e) => changeFavorite(pet._id, pet.name, e)}>
              <FavoriteIcon className="pet-img"
                src={appStore.favorites.includes(pet._id) ? purpleFavoriteIcon : emptyFavoriteIcon} />
            </FavoriteCircleButton>
          </ProfileImgContainer>
          <ProfileContentDiv row={pet.name ? "30" : "15%"}>
            {pet.name ? <NameText id="name">{pet.name}</NameText> : <div />}
            <IconsTextDiv>
              <ProfilesIcons src={pet.gender === "Macho" ? malePawIcon : femalePawIcon} />
              <AddressText>{pet.gender}, {pet.breed}</AddressText>
            </IconsTextDiv>
            <IconsTextDiv>
              <ProfilesIcons src={redPinIcon} />
              <AddressDiv>
                <AddressText>{pet.city}, {pet.state}</AddressText>
                <AddressText>{pet.district}</AddressText>
              </AddressDiv>
            </IconsTextDiv>
          </ProfileContentDiv>
        </PetProfileCardContainerButton>
      ))}
      {appStore.showAccountOptionsScreen && <Login />}
    </>
  )
}
