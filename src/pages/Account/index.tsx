import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThemeContext } from 'styled-components';
import { useHistory } from "react-router-dom";
import lostIcon from "../../assets/images/lostIcon.png"
import purpleLostIcon from "../../assets/images/purpleLostIcon.png"
import foundPetsIcon from "../../assets/images/foundPetsIcon.png"
import purpleFoundIcon from "../../assets/images/purpleFoundIcon.png"
import whiteFavoriteIcon from "../../assets/images/whiteFavoriteIcon.png"
import purpleFavoriteIcon from "../../assets/images/purpleFavoriteIcon.png"
import keyIcon from "../../assets/images/keyIcon.png"
import purpleKeyIcon from "../../assets/images/purpleKeyIcon.png"
import trashIcon from "../../assets/images/trashIcon.png"
import purpleTrashIcon from "../../assets/images/purpleTrashIcon.png"
import logoutIcon from "../../assets/images/logoutIcon.png"
import purpleLogoutIcon from "../../assets/images/purpleLogoutIcon.png"
import PetProfileCards from "../../components/PetProfileCards"
import PetProfile from '../../components/PetProfile';
import ChangePassword from "../../components/ChangePassword"
import DeleteAccount from "../../components/DeleteAccount"
import LoadingScreen from "../../components/LoadingScreen"
import Login from "../../components/Login"
import { Container, LateralPanel, PanelButtons, Icons, Results, EmptyScreen, PetsImageDiv } from './styles';
import api from "../../services/api"

const petsImage = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/petsImage.png"

export default function Account() {
  const theme = useContext(ThemeContext);
  const selectedStyle = { background: theme.primary, color: "white" };
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const ref = useRef("");

  useEffect(() => {
    if (appStore.favoritesRoute && appStore.userId) {
      SearchMyFavoritePets();
      dispatch({ type: "SET_FAVORITES_ROUTE", payload: false });
    }
  }, [appStore.favoritesRoute]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!appStore.userId) {
      dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: true });
    }
    return () => { setInitialState(); }
  }, []);

  function setInitialState() {
    dispatch({ type: "SET_PETS", payload: undefined });
    dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: false });
    dispatch({ type: "SET_FAVORITES_ROUTE", payload: false });
    ref.current = "";
  }

  const SearchMyLostPets = async () => {
    ref.current = "MyLostPets"
    setSelectedButton("MyLostPets");
    setLoading(true);
    const response = await api.get(`user/lost/${appStore.userId}`);
    const favorites = response.data.lostFavorites.concat(response.data.foundFavorites);
    if (ref.current === "MyLostPets") {
      dispatch({ type: "SET_PETS", payload: response.data.lostPets });
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    }
    setLoading(false);
  }

  const SearchMyFoundPets = async () => {
    ref.current = "MyFoundPets"
    setSelectedButton("MyFoundPets");
    setLoading(true);
    const response = await api.get(`user/found/${appStore.userId}`);
    const favorites = response.data.lostFavorites.concat(response.data.foundFavorites);
    if (ref.current === "MyFoundPets") {
      dispatch({ type: "SET_PETS", payload: response.data.foundPets });
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    }
    setLoading(false);
  }

  const SearchMyFavoritePets = async () => {
    ref.current = "Favorites"
    setSelectedButton("Favorites");
    setLoading(true);
    const lostResponse = await api.get(`user/favorites/lost/${appStore.userId}`);
    const foundResponse = await api.get(`user/favorites/found/${appStore.userId}`);
    const favorites = lostResponse.data.concat(foundResponse.data);
    const favoritesArray = favorites.reduce((arr: any, favorite: any) => { return arr.concat([favorite._id]); }, []);
    if (ref.current === "Favorites") {
      dispatch({ type: "SET_PETS", payload: favorites });
      dispatch({ type: "SET_FAVORITES", payload: favoritesArray });
    }
    setLoading(false);
  }

  const changePasswordButtonSelected = () => {
    ref.current = ""
    setSelectedButton("changePassword");
    dispatch({ type: "SET_PETS", payload: "" });
  }

  const deleteAccountButtonSelected = () => {
    ref.current = ""
    setSelectedButton("deleteAccount");
    dispatch({ type: "SET_PETS", payload: "" });
  }

  const logout = () => {
    ref.current = ""
    localStorage.removeItem("@userId");
    localStorage.removeItem("@facebook");
    dispatch({ type: "SET_USER_ID", payload: "" });
    dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
    dispatch({ type: "SET_FAVORITES", payload: [''] });
    dispatch({ type: "SET_PETS", payload: "" });
    history.push("/");
  }

  return (
    <>
      {appStore.userId ?
        <Container>
          <LateralPanel id="lateral-panel">
            <div className="empty-div" />
            <PanelButtons className="panel-buttons"
              onClick={SearchMyLostPets}
              style={selectedButton === "MyLostPets" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "MyLostPets" ? lostIcon : purpleLostIcon} />Meus Pets Perdidos
            </PanelButtons>
            <PanelButtons className="panel-buttons left-buttons"
              onClick={SearchMyFoundPets}
              style={selectedButton === "MyFoundPets" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "MyFoundPets" ? foundPetsIcon : purpleFoundIcon} />Meus Pets Encontrados
            </PanelButtons>
            <PanelButtons className="panel-buttons"
              onClick={SearchMyFavoritePets}
              style={selectedButton === "Favorites" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "Favorites" ? whiteFavoriteIcon : purpleFavoriteIcon} />Meus Favoritos
            </PanelButtons>
            <PanelButtons className="panel-buttons left-buttons"
              onClick={changePasswordButtonSelected}
              style={selectedButton === "changePassword" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "changePassword" ? keyIcon : purpleKeyIcon} />Alterar Senha
            </PanelButtons>
            <PanelButtons className="panel-buttons"
              onClick={deleteAccountButtonSelected}
              style={selectedButton === "deleteAccount" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "deleteAccount" ? trashIcon : purpleTrashIcon} />Excluir Conta
            </PanelButtons>
            <PanelButtons className="panel-buttons left-buttons"
              onClick={logout}
              style={selectedButton === "logout" ? selectedStyle : undefined} >
              <Icons src={selectedButton === "logout" ? logoutIcon : purpleLogoutIcon} />Sair
            </PanelButtons>
            <div className="empty-div" />
          </LateralPanel>
          <Results id="results">
            {appStore.pets !== undefined && appStore.pets?.length > 0 && !loading ?
              <PetProfileCards from={0} to={appStore.pets.length} />
              :
              appStore.pets?.length === 0 && !loading &&
              selectedButton !== "changePassword" && selectedButton !== "deleteAccount" ?
                <PetsImageDiv>
                  <img src={petsImage} />
                </PetsImageDiv>
                :
                <></>
            }
            {selectedButton === "changePassword" && <ChangePassword />}
            {selectedButton === "deleteAccount" && <DeleteAccount />}
            {loading && <LoadingScreen />}
          </Results>
        </Container>
        :
        <>
          <EmptyScreen />
          {appStore.showAccountOptionsScreen && <Login />}
        </>
      }
      {appStore.showPetProfile && <PetProfile />}
    </>
  );
}
