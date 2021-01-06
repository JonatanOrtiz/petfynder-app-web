import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useHistory, useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import api from '../../services/api';
import deleteIcon from '../../assets/images/deleteIcon.png';
import profileEditIcon from '../../assets/images/profileEditIcon.png';
import profileEditWhiteIcon from '../../assets/images/profileEditWhiteIcon.png';
import checkedIcon from '../../assets/images/checkedIcon.png';
import redHeartPinIcon from '../../assets/images/redHeartPinIcon.png';
import redPinIcon from '../../assets/images/redPinIcon.png';
import phoneIcon from '../../assets/images/phoneIcon.png';
import malePawIcon from '../../assets/images/malePawIcon.png';
import femalePawIcon from '../../assets/images/femalePawIcon.png';
import rightArrowIcon from '../../assets/images/rightArrowIcon.png';
import leftArrowIcon from '../../assets/images/leftArrowIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import whiteCloseIcon from '../../assets/images/whiteCloseIcon.png';
import purpleFavoriteIcon from "../../assets/images/purpleFavoriteIcon.png"
import emptyFavoriteIcon from "../../assets/images/emptyFavoriteIcon.png"
import Login from "../../components/Login"
import Alert from "../../components/Alert"
import {
  ProfileAbsoluteContainer, Container, SliderColumn, InformationColumn, MapAndButtonsColumn, CloseButton, CloseButtonSmallScreen,
  PhotoDiv, BackgroundImage, RightArrowButton, LeftArrowButton, PetInformationContainer, NameText, PhoneGenderBreedContent,
  PawPhoneIcons, LocationIcon, LocationContent, LocationTextDiv, Text, AboutContainer, ButtonsContainer, ButtonsContainerSmallScreen,
  OnlyUserOptionsButtons, DeleteText, EditText, OnlyUserOptionsButtonsIcons, AlreadyRescuedText,
  MapArea, MapContainer, MarkerImage, FavoriteCircleButton, FavoriteIcon
} from './styles'

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

const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'
const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImageSite.png'


export default function PetProfile() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [pet, setPet] = useState<Pet>();
  const [close, setClose] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<any>();

  useEffect(() => {
    if (appStore.pets !== undefined && appStore.petIndex !== undefined) {
      setPet(appStore.pets[appStore.petIndex]);
    }
  }, [reduxState])

  function deletePet() {
    const newPetsArray = appStore.pets!.filter((item: Pet) => item._id !== pet!._id);
    setAlertProps({
      showButtons: false,
      message: "Pet excluído das buscas!",
      function: () => { }
    })
    setShowAlert(true);
    if (pet!.name) {
      api.delete(`lost/${pet!._id}`);
    } else {
      api.delete(`found/${pet!._id}`);
    }
    setTimeout(() => {
      if (appStore.favorites.includes(pet!._id)) {
        undoFavorite();
      }
      closeProfileAndSetPetInitialState();
    }, 2700);
    setTimeout(() => {
      setShowAlert(false);
      dispatch({ type: "SET_PETS", payload: newPetsArray });
      dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
    }, 3000);
  }

  const updatePet = async () => {
    closeProfile();
    let photos = [];
    let petForUpdate = pet;
    for (let i = 0; i < 3; i++) {
      pet!.photos[i] ? photos.push(s3Link + pet!.photos[i]) : photos.push(greyImage);
    }
    petForUpdate!.photos = photos
    if (pet!.name) {
      dispatch({ type: 'SET_LOST_OR_FOUND', payload: "lost" });
    } else {
      dispatch({ type: 'SET_LOST_OR_FOUND', payload: "found" });
    }
    history.push("/update");
    dispatch({ type: 'SET_PET', payload: petForUpdate });
    dispatch({ type: "SET_SHOW_PET_PROFILE", payload: false });
    dispatch({ type: "SET_COORDS", payload: { lat: pet!.location.coordinates[1], lng: pet!.location.coordinates[0] } });
    dispatch({ type: "SET_MAP_ZOOM", payload: 14 });
  }

  const alreadyRescued = async () => {
    const formData = new FormData();
    if (pet !== undefined) {

      await axios.get(s3Link + pet.photos[0], { responseType: "blob" })
        .then((response) => {
          formData.append('file', response.data, "rescued");
        }).catch((error) => {
          console.log(error);
          return
        });

      if (pet.name) {
        formData.append('name', pet.name);
      }
      formData.append('breed', pet.breed);
      formData.append('state', pet.state);
      formData.append('city', pet.city);
      formData.append('district', pet.district);
      formData.append('street', pet.street);
      formData.append('animal', pet.animal);
      formData.append('gender', pet.gender);
      formData.append('about', pet.about);
      formData.append('user', appStore.userId);
      await api.post('rescued', formData)
        .then((response) => {
          setAlertProps({
            showButtons: false,
            message: "Pet Resgatado!",
            function: () => { }
          });
          setShowAlert(true);
          setTimeout(() => {
            deletePet();
            history.push("/rescued-pets");
          }, 3000);
        }).catch((error) => {
          setAlertProps({
            showButtons: false,
            message: "Erro ao salvar, tente novamente.",
            function: () => { }
          })
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          console.log(error);
          return
        });
    }
  }

  const changeHeartIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (appStore.userId) {
      const heartIconElement = document.getElementById("favorite-icon") as HTMLImageElement;
      if (heartIconElement.src === purpleFavoriteIcon) {
        undoFavorite();
        heartIconElement.src = emptyFavoriteIcon
      } else {
        setFavorite();
        heartIconElement.src = purpleFavoriteIcon;
      }
    } else {
      dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: true });
    }
  }

  const setFavorite = async () => {
    if (pet!.name) {
      api.put(`user/lost/${appStore.userId}`, { petId: pet!._id, favorite: "makeFavorite" });
    } else {
      api.put(`user/found/${appStore.userId}`, { petId: pet!._id, favorite: "makeFavorite" });
    }
    dispatch({ type: "SET_FAVORITES", payload: [...appStore.favorites, pet!._id] });
  }

  async function undoFavorite() {
    if (pet!.name) {
      api.put(`user/lost/${appStore.userId}`, { petId: pet!._id, favorite: 'undoFavorite' });
    } else {
      api.put(`user/found/${appStore.userId}`, { petId: pet!._id, favorite: 'undoFavorite' });
    }
    const favorites = appStore.favorites!.filter((item: string) => item !== pet!._id);
    dispatch({ type: "SET_FAVORITES", payload: favorites });
  }

  const Marker = (props: any) => {
    return (
      <MarkerImage src={redHeartPinIcon} />
    )
  }

  function NextArrow(props: any) {
    const { onClick } = props;
    return (
      <RightArrowButton onClick={onClick}>
        <img src={rightArrowIcon} />
      </RightArrowButton>
    );
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return (
      <LeftArrowButton onClick={onClick}      >
        <img src={leftArrowIcon} />
      </LeftArrowButton>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  function closeProfile() {
    setClose(true);
    setTimeout(() => {
      setPet(undefined);
      dispatch({ type: "SET_SHOW_PET_PROFILE", payload: false });
    }, 600);
  }

  function closeProfileAndSetPetInitialState() {
    setClose(true);
    setTimeout(() => {
      setPet(undefined);
      dispatch({ type: "SET_SHOW_PET_PROFILE", payload: false });
      dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
      if (location.pathname === "/update") {
        history.push("/account");
      }
    }, 600);
  }

  const OnlyUserOptions = () => (
    <>
      <OnlyUserOptionsButtons
        onClick={() => [
          setAlertProps({
            showButtons: true,
            message: "Tem certeza que deseja excluir este pet?",
            function: deletePet
          }),
          setShowAlert(true)
        ]}>
        <OnlyUserOptionsButtonsIcons src={deleteIcon} />
        <DeleteText>Excluir</DeleteText>
      </OnlyUserOptionsButtons>
      <OnlyUserOptionsButtons
        onClick={updatePet}>
        <OnlyUserOptionsButtonsIcons src={appStore.theme === "light" ? profileEditIcon : profileEditWhiteIcon} />
        <EditText>Editar</EditText>
      </OnlyUserOptionsButtons>
      <OnlyUserOptionsButtons
        onClick={() => [
          setAlertProps({
            showButtons: true,
            message: 'Ao marcar um pet como "Já resgatado" ele é excluído das buscas. Deseja continuar?',
            function: alreadyRescued
          }),
          setShowAlert(true)
        ]}>
        <OnlyUserOptionsButtonsIcons src={checkedIcon} />
        <AlreadyRescuedText>Marcar como "Já resgatado"</AlreadyRescuedText>
      </OnlyUserOptionsButtons>
    </>
  )

  return (
    <>
      {
        appStore.showPetProfile &&
        <ProfileAbsoluteContainer style={close ? { opacity: 0 } : { opacity: 1 }}>
          {pet !== undefined &&
            <Container>
              <SliderColumn id="slider-column">
                <CloseButtonSmallScreen id="close-button-small-screen"
                  onClick={() => closeProfileAndSetPetInitialState()}>
                  <img src={appStore.theme === "light" ? closeIcon : whiteCloseIcon} />
                </CloseButtonSmallScreen>
                <Slider {...settings}>
                  {(pet.photos).map((image: string, index: number) => (
                    <>
                      <PhotoDiv>
                        <BackgroundImage key={index} src={s3Link + image} />
                      </PhotoDiv>
                      <FavoriteCircleButton className="favorite-button" onClick={(e) => changeHeartIcon(e)}>
                        <FavoriteIcon id="favorite-icon"
                          src={appStore.favorites.includes(pet._id) ? purpleFavoriteIcon : emptyFavoriteIcon} />
                      </FavoriteCircleButton>
                    </>
                  ))}
                </Slider>
              </SliderColumn>
              <InformationColumn id="information-column">
                <PetInformationContainer>
                  <div id="inf">
                    {pet.name && <NameText id="name">{pet.name} </NameText>}
                    <PhoneGenderBreedContent>
                      <PawPhoneIcons src={pet.gender === "Macho" ? malePawIcon : femalePawIcon} />
                      <Text>{pet.gender}, {pet.breed}</Text>
                    </PhoneGenderBreedContent>
                    <LocationContent>
                      <LocationIcon src={redPinIcon} />
                      <LocationTextDiv>
                        <Text>{pet.city}, {pet.state}</Text>
                        <Text>{pet.district}, {pet.street}</Text>
                      </LocationTextDiv>
                    </LocationContent>
                    <PhoneGenderBreedContent>
                      <PawPhoneIcons src={phoneIcon} />
                      <Text>{pet.phone} - {pet.contactName}</Text>
                    </PhoneGenderBreedContent>
                  </div>
                  <Text>
                    Data da publicação: {pet.updatedAt.substring(0, 10).split("-").reverse().join("/")}
                  </Text>
                  <AboutContainer>
                    <Text>{pet.about}</Text>
                  </AboutContainer>
                </PetInformationContainer>
              </InformationColumn>
              <MapAndButtonsColumn id="map-and-buttons-column">
                <CloseButton id="close-button"
                  onClick={() => closeProfileAndSetPetInitialState()}>
                  <img src={appStore.theme === "light" ? closeIcon : whiteCloseIcon} />
                </CloseButton>
                {pet.user === appStore.userId &&
                  <>
                    <ButtonsContainer id="buttons-container">
                      <OnlyUserOptions />
                    </ButtonsContainer>
                  </>
                }
                <MapArea id="map-area">
                  <Text>Última localização conhecida:</Text>
                  <MapContainer>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "AIzaSyBy4KVsYVODK8UBi77QxMaEtFK037ImH1E" }}
                      defaultCenter={{ lat: pet.location.coordinates[1], lng: pet.location.coordinates[0] }}
                      defaultZoom={17}
                    >
                      <Marker
                        lat={pet.location.coordinates[1]}
                        lng={pet.location.coordinates[0]}
                      />
                    </GoogleMapReact>
                  </MapContainer>
                </MapArea>
                {pet.user === appStore.userId &&
                  <>
                    <ButtonsContainerSmallScreen id="buttons-container-small-screen">
                      <OnlyUserOptions />
                    </ButtonsContainerSmallScreen>
                  </>
                }
              </MapAndButtonsColumn>
            </Container>
          }
        </ProfileAbsoluteContainer>
      }
      {appStore.showAccountOptionsScreen && <Login />}
      {showAlert &&
        <Alert
          showButtons={alertProps.showButtons}
          message={alertProps.message}
          cancel={() => setTimeout(() => {
            setShowAlert(false)
          }, 400)}
          confirm={() => alertProps.function()}
        />
      }
    </>
  );
}
