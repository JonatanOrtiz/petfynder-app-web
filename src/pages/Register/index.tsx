import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import MapRegister from "../../components/MapRegister"
import Form from "../../components/Form"
import Photos from "../../components/Photos"
import RadioSelection from "../../components/RadioSelection"
import StandardButton from "../../components/StandardButton"
import LoadingScreen from "../../components/LoadingScreen"
import PetProfile from "../../components/PetProfile"
import Login from "../../components/Login"
import Alert from "../../components/Alert"
import { PageContainer, FormColumn, ErrorMessage, LostOrFoundSelectionScreen, LostAndFoundButton } from './styles'
import api from "../../services/api"

const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImageSite.png'

export default function Register() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petStore = reduxState.petReducer;
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [emptyField, setEmptyField] = useState('');
  const [firstRender, setFirstRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<any>();

  useEffect(() => {
    setEmptyField("");
  }, [reduxState]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFirstRender(true);
    dispatch({ type: "SET_STATE", payload: "" });
    dispatch({ type: "SET_CITY", payload: "" });
    dispatch({ type: "SET_PETS", payload: undefined });
    dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
    dispatch({ type: "SET_COLORS", payload: [] });
    document.addEventListener("keydown", blockTab);
  }, []);

  const blockTab = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  }, [])

  function setLostOrFound(lostOrFound: string) {
    setFirstRender(false);
    document.removeEventListener("keydown", blockTab);
    dispatch({ type: "SET_LOST_OR_FOUND", payload: lostOrFound });
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
    save();
  }

  const save = async () => {
    if (!appStore.userId) {
      dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: true });
      return
    }
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
      if (typeof (petStore.photos[i]) !== "string") {
        formData.append('file', petStore.photos[i], `image-${i}`);
      } else {
        if (i === 2) {
        }
      }
    }

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

    await api.post(`${appStore.lostOrFound}/`, formData)
      .then((response) => {
        setLoading(false);
        dispatch({ type: "SET_PET_INDEX", payload: 0 });
        dispatch({ type: "SET_PETS", payload: [response.data] });
        setTimeout(() => {
          dispatch({ type: "SET_SHOW_PET_PROFILE", payload: true });
        }, 1000);
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
            <StandardButton title='Salvar Cadastro' handleClick={checkValues} />
          </div>
        </div>
        <div id="fake-column">
          <ErrorMessage>{emptyField}</ErrorMessage>
          <StandardButton title='Salvar Cadastro' handleClick={checkValues} />
        </div>
        {loading && <LoadingScreen />}
      </PageContainer>
      {appStore.showPetProfile && <PetProfile />}
      {firstRender &&
        <LostOrFoundSelectionScreen>
          <div id="lost-or-found-screen-internal-div">
            <p>Você quer cadastrar um Pet perdido ou um Pet encontrado?</p>
            <div>
              <LostAndFoundButton
                onClick={() => setLostOrFound("lost")}>
                <p>Perdido</p>
              </LostAndFoundButton>
              <LostAndFoundButton
                onClick={() => setLostOrFound("found")}>
                <p>Encontrado</p>
              </LostAndFoundButton>
            </div>
          </div>
        </LostOrFoundSelectionScreen>
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