import React, { useState, useEffect } from 'react';
import malePawIcon from "../../assets/images/malePawIcon.png"
import femalePawIcon from "../../assets/images/femalePawIcon.png"
import redPinIcon from "../../assets/images/redPinIcon.png"
import api from "../../services/api"
import {
  Container, CardsContainer, PetProfileContainerDiv, ProfileImgContainer, ProfileImg, ProfileContentDiv,
  NameText, IconsTextDiv, AddressDiv, ProfilesIcons, AddressText, NameContainer
} from "./styles"

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

const s3Link = "https://petfynderimages.s3-sa-east-1.amazonaws.com/"

export default function Rescued() {
  const [rescued, setRescued] = useState<Pet[]>()

  useEffect(() => {
    window.scrollTo(0, 0);
    let mounted = true;
    async function getPets() {
      const response = await api.get('rescued');
      setRescued(response.data)
    }
    getPets();
    return () => { mounted = false };
  }, []);

  return (
    <Container>
      <h1>Estes pets já estão reunidos com seus donos!</h1>
      <CardsContainer>
        {rescued && rescued.map((pet: Pet, index: number) => (
          <PetProfileContainerDiv id="pet-profile-card" key={index}>
            <ProfileImgContainer>
              <ProfileImg src={s3Link + pet.photo} />
            </ProfileImgContainer>
            <ProfileContentDiv rows={pet.name !== "undefined" ? "34% 16.5% 33% 16.5%" : "18% 17% 46% 19%"}>
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
      </CardsContainer>
    </Container>
  );
}
