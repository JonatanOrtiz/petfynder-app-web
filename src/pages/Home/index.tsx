import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import malePawIcon from "../../assets/images/malePawIcon.png"
import femalePawIcon from "../../assets/images/femalePawIcon.png"
import redPinIcon from "../../assets/images/redPinIcon.png"
import PetProfileCards from '../../components/PetProfileCards';
import PetProfile from '../../components/PetProfile';
import { Link } from "react-router-dom";
import {
  Container, LayerDiv, RightImagesLayerDiv, LeftImagesLayerDiv,
  InformationDiv, RightImageDiv, LeftImageDiv, Image, PetCardsDiv,
  PetProfileContainerDiv, ProfileImgContainer, ProfileImg, ProfileContentDiv,
  NameText, IconsTextDiv, AddressDiv, ProfilesIcons, AddressText, NameContainer
} from './styles';
import api from "../../services/api"

const dog = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/dog.png";
const cat = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/cat.png";
const bird = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/bird.png";
const womanWithDog = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/womanWithDog.png";
const s3Link = "https://petfynderimages.s3-sa-east-1.amazonaws.com/"

interface Pet {
  name: string;
  breed: string;
  state: string;
  city: string;
  district: string;
  street: string;
  gender: string;
  photo: string;
  createdAt: string;
}

export default function Home() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const [rescued, setRescued] = useState<Pet[]>()

  useEffect(() => {
    window.scrollTo(0, 0);
    let mounted = true;
    async function searchRecentPets() {
      if (appStore.userId) {
        const userResponse = await api.get(`user/lost/${appStore.userId}`);
        const favorites = userResponse.data.lostFavorites.concat(userResponse.data.foundFavorites);
        if (mounted) {
          dispatch({ type: "SET_FAVORITES", payload: favorites });
        }
      }

      const response = await api.get("recently");
      const lostAndFound = response.data.slice(0, 12);
      const rescued = response.data.slice(12, 19);
      if (mounted) {
        dispatch({ type: "SET_PETS", payload: lostAndFound });
        setRescued(rescued);
      }
    }
    searchRecentPets();

    return () => { mounted = false; }
  }, [])

  useEffect(() => {
    return () => { dispatch({ type: "SET_PETS", payload: undefined }); }
  }, [])

  return (
    <Container>
      <LeftImagesLayerDiv>
        <LeftImageDiv>
          <Image src={dog} />
        </LeftImageDiv>
        <InformationDiv>
          <div className="information-texts-div" style={{ flexWrap: "wrap" }}>
            <h3>Bem vindo ao</h3>
            <h1 id="app-name">Petfynder</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <h3 style={{ margin: "0.5rem", whiteSpace: "nowrap" }} >Ajudamos você a</h3>
            <h2 style={{ fontSize: "3rem", margin: "0.5rem" }} > encontrar </h2>
            <h3 style={{ margin: "0.5rem", whiteSpace: "nowrap" }} >seu pet perdido!</h3>
          </div>
        </InformationDiv>
      </LeftImagesLayerDiv>
      <LayerDiv>
        <h2>Veja alguns pets que se perderam recentemente: </h2>
        <PetCardsDiv>
          {appStore.pets && <PetProfileCards from={0} to={6} />}
        </PetCardsDiv>
      </LayerDiv>
      <RightImagesLayerDiv>
        <InformationDiv>
          <div id="flex-start-div" style={{ alignSelf: "flex-start", whiteSpace: "nowrap", marginLeft: "5rem" }}>
            <h3 style={{ marginLeft: "2rem", marginTop: "4rem" }} >
              <Link to="/register" >Publique </Link>
            seu pet
            </h3>
            <h1 style={{ marginLeft: "10rem" }}>Perdido</h1>
            <h3 style={{ margin: "0.5rem", marginLeft: "19rem" }}>ou</h3>
            <h1 style={{ marginLeft: "16rem" }}>Encontrado</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "nowrap" }}>
              <h2 style={{ whiteSpace: "nowrap", margin: "0.5rem", marginTop: "1.3rem", marginLeft: "4rem" }}>em qualquer</h2>
              <h2 style={{ whiteSpace: "nowrap", margin: "0.5rem", marginTop: "1.3rem" }}>lugar do Brasil</h2>
            </div>
          </div>
        </InformationDiv>
        <RightImageDiv>
          <Image src={cat} />
        </RightImageDiv>
      </RightImagesLayerDiv>
      <LayerDiv style={{ position: "relative", bottom: 0 }} >
        <h2>Nossos usuários encontraram estes pets recentemente: </h2>
        <PetCardsDiv>
          {appStore.pets && <PetProfileCards from={6} to={13} />}
        </PetCardsDiv>
        <h2 id="absolute-h2">Algum deles é o seu pet perdido?
        <Link style={{ marginLeft: "1rem" }} to="/search"> Busque </Link>
        para ver mais perfis.
        </h2>
      </LayerDiv>
      <LeftImagesLayerDiv>
        <LeftImageDiv>
          <Image src={bird} />
        </LeftImageDiv>
        <InformationDiv>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ marginTop: "2rem" }} >Utilize nosso </h3>
            <h1 > filtro </h1>
          </div>
          <h3>e
            <Link to="/search"> Busque </Link>
            por seu pet
          </h3>
          <h3>pelas características dele.</h3>
          <h3 id="h3-nowrap" style={{ textAlign: "center" }}>Você também pode procurá-lo por</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <h2 style={{ margin: "0.5rem", whiteSpace: "nowrap" }} >localização em</h2>
            <h2 style={{ margin: "0.5rem", whiteSpace: "nowrap" }} >todo o país</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ marginTop: "2rem" }} >utilizando nosso</h3>
            <h1>mapa</h1>
          </div>
        </InformationDiv>
      </LeftImagesLayerDiv>
      <LayerDiv>
        <h2>Estes pets já foram <Link to="/rescued-pets"> resgatados </Link> e estão com seus donos novamente: </h2>
        <PetCardsDiv>
          {rescued && rescued.map((pet: Pet, index: number) => (
            <PetProfileContainerDiv id="pet-profile-card" key={index}>
              <ProfileImgContainer>
                <ProfileImg src={s3Link + pet.photo} />
              </ProfileImgContainer>
              <ProfileContentDiv rows={pet.name !== "undefined" ? "34% 16.5% 33% 16.5%" : "18% 17% 46% 19%"} >
                <NameContainer>
                  {pet.name !== "undefined" && <NameText id="name">{pet.name}</NameText>}
                </NameContainer>
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
                <AddressText>
                  Data do Resgate: {pet.createdAt.substring(0, 10).split("-").reverse().join("/")}
                </AddressText>
              </ProfileContentDiv>
            </PetProfileContainerDiv>
          ))}
        </PetCardsDiv>
      </LayerDiv>
      <RightImagesLayerDiv>
        <InformationDiv>
          <h3>
            Nossa
            </h3>
          <h1 >Missão</h1>
          <h3 >é ajudar você e seu pet a se </h3>
          <h1 >encontrarem</h1>
          <h2>novamente</h2>
        </InformationDiv>
        <RightImageDiv>
          <Image src={womanWithDog} />
        </RightImageDiv>
      </RightImagesLayerDiv>
      {appStore.showPetProfile && <PetProfile />}
    </Container>
  );
}
