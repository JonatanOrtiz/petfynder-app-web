import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import axios from "axios";
import MapRegister from "../../components/MapRegister"
import Form from "../../components/Form"
import Photos from "../../components/Photos"
import RadioSelection from "../../components/RadioSelection"
import StandardButton from "../../components/StandardButton"
import Redirect from "../../components/Redirect"
import PetProfile from "../../components/PetProfile"
import LoadingScreen from "../../components/LoadingScreen"
import Alert from "../../components/Alert"
import api from "../../services/api"
import { PageContainer, FormColumn, ErrorMessage } from '../Register/styles'

const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImageSite.png'

export default function Update() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petStore = reduxState.petReducer;
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();
  const [photosForDelete, setPhotosForDelete] = useState([""])
  const [loading, setLoading] = useState(false);
  const [emptyField, setEmptyField] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<any>();

  useEffect(() => {
    setEmptyField("");
  }, [reduxState]);

  useEffect(() => {
    const photosForDeleteWithoutGeyImage = [];

    for (let i = 0; i < 3; i++) {
      if (petStore.photos[i] !== greyImage) {
        photosForDeleteWithoutGeyImage.push(petStore.photos[i]);
      }
    }

    setPhotosForDelete(photosForDeleteWithoutGeyImage);
  }, [appStore.showPetProfile]);

  useEffect(() => {
    return () => { setInitialState(); }
  }, []);

  function setInitialState() {
    dispatch({ type: "SET_PETS", payload: undefined });
    dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
    dispatch({ type: "SET_LOST_OR_FOUND", payload: "lost" });
  }

  const checkValues = () => {
    let testPhotos;

    petStore.photos.forEach(function (photo: string) {
      if (photo !== greyImage) {
        testPhotos = true
      }
    });
    if (appStore.lostOrFound === 'lost' && petStore.name === '') { setEmptyField('O campo "Nome" é obrigatório.'); return; }
    if (petStore.breed === '') { setEmptyField('O campo "Raça" é obrigatório.'); return; }
    if (petStore.state === '') { setEmptyField('O campo "Estado" é obrigatório.'); return; }
    if (petStore.city === '') { setEmptyField('O campo "Cidade" é obrigatório.'); return; }
    if (petStore.district === '') { setEmptyField('O campo "Bairro" é obrigatório.'); return; }
    if (petStore.street === '') { setEmptyField('O campo "Rua/..." é obrigatório.'); return; }
    if (petStore.phone === '') { setEmptyField('O campo "Telefone" é obrigatório.'); return; }
    if (petStore.contactName === '') { setEmptyField('O campo "Nome do contato" é obrigatório.'); return; }
    if (petStore.about === '') {
      if (appStore.lostOrFound === 'lost') {
        setEmptyField('Descreva detalhes importantes.\nEx:\n"Animal arisco..."\n"Ofereço recompensa..."');
      } else {
        setEmptyField('Descreva detalhes importantes.\nEx:\n"Animal arisco..."\n"Está machucado..."');
      }
      return;
    }
    if (!testPhotos) { setEmptyField('Envie ao menos uma foto.'); return; }
    if (petStore.location.coordinates[1] === 0) { setEmptyField('Marque a localização no mapa.'); return; }
    if (petStore.animal === '') { setEmptyField('Marque se o animal é Cão, Gato ou Ave.'); return; }
    if (petStore.gender === '') { setEmptyField('Marque se o animal é Macho ou Fêmea.'); return; }
    if (petStore.colors.length === 0) { setEmptyField('Marque as cores do animalzinho.'); return; }
    update();
  }

  const update = async () => {
    setLoading(true);

    const colorsArray = [];

    petStore.colors.includes("preto") && colorsArray.push('preto');
    petStore.colors.includes("branco") && colorsArray.push('branco');
    petStore.colors.includes("cinza") && colorsArray.push('cinza');
    petStore.colors.includes("marrom") && colorsArray.push('marrom');
    petStore.colors.includes("bege") && colorsArray.push('bege');
    petStore.colors.includes("laranja") && colorsArray.push('laranja');
    petStore.colors.includes("amarelo") && colorsArray.push('amarelo');
    petStore.colors.includes("vermelho") && colorsArray.push('vermelho');
    petStore.colors.includes("rosa") && colorsArray.push('rosa');
    petStore.colors.includes("roxo") && colorsArray.push('roxo');
    petStore.colors.includes("azul") && colorsArray.push('azul');
    petStore.colors.includes("verde") && colorsArray.push('verde');

    const colors = colorsArray.join();

    const formData = new FormData();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (photosForDelete[i] === petStore.photos[j]) {
          await axios.get(photosForDelete[i], { responseType: "blob" })
            .then((response) => {
              formData.append('file', response.data, `image-${i + 2}`);
            }).catch((error) => {
              console.log(error);
              return
            });
        } else {
          if (i === 2 && j === 2) {
          }
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (typeof (petStore.photos[i]) !== "string") {
        formData.append('file', petStore.photos[i], `image-${i}`);
      } else {
        if (i === 2) {
        }
      }
    }

    const photosForDeleteWithoutLink: string[] = [];

    photosForDelete.forEach(function (photo) {
      photosForDeleteWithoutLink.push("" + photo.toString().split(".com/").pop());
    });

    const photosForDeleteString = photosForDeleteWithoutLink.join();

    if (appStore.lostOrFound === 'lost') {
      formData.append('name', petStore.name);
    }
    formData.append('state', petStore.state);
    formData.append('breed', petStore.breed);
    formData.append('city', petStore.city);
    formData.append('district', petStore.district);
    formData.append('street', petStore.street);
    formData.append('phone', petStore.phone);
    formData.append('contactName', petStore.contactName);
    formData.append('animal', petStore.animal);
    formData.append('gender', petStore.gender);
    formData.append('about', petStore.about);
    formData.append('colors', colors);
    formData.append('latitude', petStore.location.coordinates[1]);
    formData.append('longitude', petStore.location.coordinates[0]);
    formData.append('user', appStore.userId);
    formData.append('photosForDelete', photosForDeleteString);

    await api.put(`${appStore.lostOrFound}/${petStore._id}`, formData)
      .then((response) => {
        setLoading(false);
        dispatch({ type: "SET_PET_INDEX", payload: 0 })
        dispatch({ type: "SET_PETS", payload: [response.data] })
        dispatch({ type: "SET_SHOW_PET_PROFILE", payload: true })
      }).catch((error) => {
        setLoading(false);
        setAlertProps({
          showButtons: false,
          message: "Erro ao salvar, tente com imagens menores.",
          function: () => { }
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.message) {
          console.log(error.message);
          
        }
        if (error.status) {
          console.log(error.status);
          
        }
        console.log(error);
        return
      });
  }

  return (
    <>
      {appStore.userId && petStore.user ?
        <>
          <PageContainer>
            <FormColumn id="form-column">
              <p className="generic-text">Informe os dados deste Pet:</p>
              <Form />
            </FormColumn>
            <div id="photos-map-column">
              <p className="generic-text">Envie fotos (max: 2mb) para vermos como é este Pet:</p>
              <Photos />
              <p className="generic-text">Marque no Mapa a última localização conhecida deste Pet:</p>
              <MapRegister />
            </div>
            <div id="radio-selection-column">
              <p className="generic-text">Selecione as características deste Pet:</p>
              <RadioSelection />
              <div id="standard-button-div">
                <ErrorMessage>{emptyField}</ErrorMessage>
                <StandardButton title='Atualizar' handleClick={checkValues} />
              </div>
            </div>
            <div id="fake-column">
              <ErrorMessage>{emptyField}</ErrorMessage>
              <StandardButton title='Atualizar' handleClick={checkValues} />
            </div>
            {loading && <LoadingScreen />}
          </PageContainer>
          {appStore.showPetProfile && <PetProfile />}
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
        :
        <Redirect />
      }
    </>
  );
}
