import React, { useState, useEffect, useContext, useRef } from "react"
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { ThemeContext } from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";
import GoogleMapReact from "google-map-react";
import magnifyingIcon from "../../assets/images/magnifyingIcon.png"
import mapIcon from "../../assets/images/mapIcon.png"
import filterIcon from "../../assets/images/filterIcon.png"
import downArrowIcon from "../../assets/images/downArrowIcon.png"
import StatesAndCitiesPicker from "../../components/StatesAndCitiesPicker"
import ColorsSelection from "../../components/ColorsSelection"
import LoadingScreen from "../../components/LoadingScreen"
import PetProfileCards from "../../components/PetProfileCards"
import PetProfile from "../../components/PetProfile"
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api"
import {
  SearchContainer, SearchBar, SearchInputDiv, LostOrFoundButton, LostOrFoundButtonText, DownArrowIcon, LostOrFoundDropDownDiv,
  LostOrFoundDropDownButton, LostOrFoundDropDownButtonText, SearchInput, SearchButton, SearchIcon, MapButton, MapButtonLarge,
  MapButtonText, MapIcon, MapAndFilterButtonsDiv, FilterButton, FilterButtonText, FilterIcon, FilterLateralDiv,
  PublicationDateDiv, TitleText, PickDateButton, FromToDateDiv, FromToDateText, RadioSelectionDiv, RadioButton, BorderSelected,
  BorderUnselected, CenterSelected, CenterUnselected, RadioText, ResultsDiv, MapContainer, MapMarkerContainer, MapPetButton,
  MapProfileImg, MapArrow, NothingFoundImage
} from "./styles"

const petsImage = "https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/petsImage.png"

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

export default function Search() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petStore = reduxState.petReducer;
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const [initialDate, setInitialDate] = useState<any>(new Date(2020, 0, 1, 8));
  const [finalDate, setFinalDate] = useState<any>(new Date());
  const [dog, setDog] = useState(false);
  const [cat, setCat] = useState(false);
  const [bird, setBird] = useState(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [petsFixedArray, setPetsFixedArray] = useState<Pet[]>();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(false);
  const [showAbsoluteFilterDiv, setShowAbsoluteFilterDiv] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [smallText, setSmallText] = useState(false);
  const [resizeController, setResizeController] = useState(window.innerWidth);
  const ref = useRef("");

  useEffect(() => {
    if (appStore.pets !== undefined && !firstRender) {
      searchFilter();
    }
    setFirstRender(false);
  }, [petsFixedArray, dog, cat, bird, male, female, initialDate, finalDate, petStore]);

  useEffect(() => {
    dispatch({ type: "SET_LOST_OR_FOUND", payload: "lost" });
    dispatch({ type: "SET_PET_INITIAL_STATE", payload: "" });
    return () => { setInitialState(); }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.innerWidth >= 559) {
      setSmallText(false);
      setShowAbsoluteFilterDiv(true);
    } else {
      setSmallText(true);
      setShowAbsoluteFilterDiv(false);
    }
    return () => { ref.current = ""; }
  }, []);

  const Selected = () => <BorderSelected><CenterSelected /></BorderSelected>;
  const Unselected = () => <BorderUnselected><CenterUnselected /></BorderUnselected>;

  const DropDownVisibility = () => {
    const dropDown = document.getElementById("dropDown");
    if (dropDown!.style.visibility === "hidden") {
      dropDown!.style.visibility = "visible";
      dropDown!.focus();
    } else {
      dropDown!.style.visibility = "hidden";
    }
  }

  const changeFilterStyleAndButtonText = () => {
    setResizeController(window.innerWidth);
    if (window.innerWidth > resizeController + 25) {
      if (window.innerWidth >= 559) {
        setSmallText(false);
        setShowAbsoluteFilterDiv(true);
      } else {
        setSmallText(true);
        setShowAbsoluteFilterDiv(false);
      }
    }
  }

  window.addEventListener('resize', changeFilterStyleAndButtonText);

  const CustomInputInitialDate = ({ value, onClick }: { value: string, onClick: React.MouseEventHandler }) => (
    <PickDateButton className="date-button" onClick={onClick}>
      {value}
    </PickDateButton>
  );

  const CustomInputFinalDate = ({ value, onClick }: { value: string, onClick: React.MouseEventHandler }) => (
    <PickDateButton className="date-button" onClick={onClick}>
      {value}
    </PickDateButton>
  );

  const Marker = (props: any) => {
    const { pet, index } = props;

    return (
      <MapMarkerContainer>
        <MapPetButton key={index}
          onClick={() => [dispatch({ type: "SET_SHOW_PET_PROFILE", payload: true }), dispatch({ type: "SET_PET_INDEX", payload: index })]}>
          <MapProfileImg src={s3Link + pet.photos[0]} />
        </MapPetButton>
        <MapArrow>{""}</MapArrow>
      </MapMarkerContainer>
    )
  }

  function searchFilter() {
    let newState, newCity, newAnimal, newMale, newFemale, newColorArray;
    let newInicialDate: string, newFinalDate: string, petsFinalArray;
    newInicialDate = initialDate!.toLocaleString("pt-BR").split(" ")[0].split("/").reverse().join("");
    newFinalDate = finalDate!.toLocaleString("pt-BR").split(" ")[0].split("/").reverse().join("");

    petStore.state !== "" ? newState = petsFixedArray!.filter((item) => item.state === petStore.state) : newState = petsFixedArray;
    petStore.city ? newCity = newState!.filter((item) => item.city === petStore.city) : newCity = newState;
    if (dog && cat && bird || !dog && !cat && !bird) {
      newAnimal = newCity;
    } else {
      dog && !cat && !bird ? newAnimal = newCity!.filter((item) => item.animal === "Cão") :
        bird && !cat && !dog ? newAnimal = newCity!.filter((item) => item.animal === "Ave") :
          cat && !dog && !bird ? newAnimal = newCity!.filter((item) => item.animal === "Gato") :
            cat && dog && !bird ? newAnimal = newCity!.filter((item) => item.animal === "Gato" || item.animal === "Cão") :
              cat && !dog && bird ? newAnimal = newCity!.filter((item) => item.animal === "Gato" || item.animal === "Ave") :
                newAnimal = newCity!.filter((item) => item.animal === "Cão" || item.animal === "Ave");
    }
    if (male !== female) {
      male ? newMale = newAnimal!.filter((item) => item.gender === "Macho") : newMale = newAnimal;
      female ? newFemale = newMale!.filter((item) => item.gender === "Fêmea") : newFemale = newMale;
    } else { newFemale = newAnimal }
    petStore.colors.length > 0 ? newColorArray = newFemale!.filter((item) => item.colors.every((value: string) => petStore.colors.includes(value)) && petStore.colors.every((value: string) => item.colors.includes(value))) : newColorArray = newFemale;
    petsFinalArray = newColorArray!.filter((item) => newInicialDate <= item.updatedAt.substring(0, 10).split("-").join("") &&
      item.updatedAt.substring(0, 10).split("-").join("") <= newFinalDate);

    dispatch({ type: "SET_PETS", payload: petsFinalArray });
  }

  const changeToLostOrToFound = (lostOrFoundProps: string) => {
    setInitialState();
    setPetsFixedArray(undefined);
    dispatch({ type: "SET_PETS", payload: undefined });
    dispatch({ type: "SET_LOST_OR_FOUND", payload: lostOrFoundProps });
  }

  const setInitialState = () => {
    setDog(false);
    setCat(false);
    setBird(false);
    setMale(false);
    setFemale(false);
    setInitialDate(new Date(2020, 0, 1, 8));
    setFinalDate(new Date());
    dispatch({ type: "SET_PETS", payload: undefined });
  }

  const Search = async () => {
    ref.current = "search"
    setLoading(true);
    setSearch(true);
    setInitialState();
    dispatch({ type: "SET_STATE", payload: "" });
    dispatch({ type: "SET_CITY", payload: "" });
    dispatch({ type: "SET_COLORS", payload: [] })

    if (appStore.userId) {
      const userResponse = await api.get(`user/lost/${appStore.userId}`);
      const favorites = userResponse.data.lostFavorites.concat(userResponse.data.foundFavorites);
      if (ref.current === "search") {
        dispatch({ type: "SET_FAVORITES", payload: favorites });
      }
    }

    let response

    if (!searchInput || searchInput === "") {
      response = await api.get(appStore.lostOrFound, {
        params: {
          searchInput: "",
        }
      })
    } else {
      response = await api.get(appStore.lostOrFound, {
        params: {
          searchInput: searchInput,
        }
      })
    }
    setPetsFixedArray(response.data);
    if (ref.current === "search") {
      dispatch({ type: "SET_PETS", payload: response.data });
    }
    setLoading(false);
  }

  return (
    <>
      <SearchBar>
        <SearchInputDiv className="search-bar-child">
          <LostOrFoundButton onClick={DropDownVisibility}>
            <LostOrFoundButtonText>
              {appStore.lostOrFound === "lost" && !smallText && "Pets Perdidos"}
              {appStore.lostOrFound === "lost" && smallText && "Perdidos"}
              {appStore.lostOrFound === "found" && !smallText && "Pets Encontrados"}
              {appStore.lostOrFound === "found" && smallText && "Encontrados"}
            </LostOrFoundButtonText>
            <DownArrowIcon src={downArrowIcon} />
          </LostOrFoundButton>
          <LostOrFoundDropDownDiv
            id="dropDown"
            tabIndex={1}
            onBlur={DropDownVisibility}
            style={{ visibility: "hidden" }}>
            <LostOrFoundDropDownButton onMouseDown={() => changeToLostOrToFound("lost")}>
              <LostOrFoundDropDownButtonText>Pets Perdidos</LostOrFoundDropDownButtonText>
            </LostOrFoundDropDownButton>
            <LostOrFoundDropDownButton onMouseDown={() => changeToLostOrToFound("found")}>
              <LostOrFoundDropDownButtonText>Pets Encontrados</LostOrFoundDropDownButtonText>
            </LostOrFoundDropDownButton>
          </LostOrFoundDropDownDiv>
          <form onSubmit={e => { e.preventDefault(); }}>
            <SearchInput id="search-input"
              autoCapitalize="none"
              maxLength={60}
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = "Digite sua busca..."}
              placeholder="Digite sua busca..."
              autoCorrect="false"
              onChange={e => setSearchInput(e.target.value)}
              value={searchInput} />
            <SearchButton type="submit" onClick={Search}>
              <SearchIcon src={magnifyingIcon} />
            </SearchButton>
          </form>
        </SearchInputDiv>
        <MapButton style={showMap ? { background: theme.primary } : { background: theme.white }}
          onClick={() => setShowMap(!showMap)}
          className="search-bar-child">
          <MapButtonText style={showMap ? { color: theme.white } : { color: theme.primary }}>
            {showMap ? "Fechar Mapa" : "Ver no Mapa"}
          </MapButtonText>
          <MapIcon src={mapIcon} />
        </MapButton>
        <MapAndFilterButtonsDiv>
          <MapButtonLarge style={showMap ? { background: theme.primary } : { background: theme.white }}
            onClick={() => setShowMap(!showMap)}>
            <MapButtonText style={showMap ? { color: theme.white } : { color: theme.primary }}>
              {showMap ? "Fechar Mapa" : "Ver no Mapa"}
            </MapButtonText>
            <MapIcon src={mapIcon} />
          </MapButtonLarge>
          <FilterButton style={showAbsoluteFilterDiv ? { background: theme.primary } : { background: theme.white }}
            onClick={() => setShowAbsoluteFilterDiv(!showAbsoluteFilterDiv)}>
            <FilterButtonText style={showAbsoluteFilterDiv ? { color: theme.white } : { color: theme.primary }}>
              {showAbsoluteFilterDiv ? "Fechar Filtro" : "Abrir Filtro"}
            </FilterButtonText>
            <FilterIcon src={filterIcon} />
          </FilterButton>
        </MapAndFilterButtonsDiv>
      </SearchBar>
      <SearchContainer>
        {showAbsoluteFilterDiv &&
          <FilterLateralDiv>
            <StatesAndCitiesPicker />
            <div id="title-options-div">
              <div>
                <PublicationDateDiv id="publication-date">
                  <TitleText className="titles">Data da Publicação</TitleText>
                  <FromToDateDiv>
                    <FromToDateText>De</FromToDateText>
                    <DatePicker
                      dateFormat="dd/MM/yyyy" selected={initialDate} onChange={date => setInitialDate(date)}
                      customInput={<CustomInputInitialDate value={""} onClick={() => { }} />} />
                  </FromToDateDiv>
                  <FromToDateDiv>
                    <FromToDateText>Até</FromToDateText>
                    <DatePicker
                      dateFormat="dd/MM/yyyy" selected={finalDate} onChange={date => setFinalDate(date)}
                      customInput={<CustomInputFinalDate value={""} onClick={() => { }} />} />
                  </FromToDateDiv>
                </PublicationDateDiv>
                <RadioSelectionDiv>
                  <TitleText className="titles">Espécie</TitleText>
                  <RadioButton onClick={() => setDog(!dog)}>
                    {dog ? <Selected /> : <Unselected />}
                    <RadioText>Cachorro</RadioText>
                  </RadioButton>
                  <RadioButton onClick={() => setCat(!cat)}>
                    {cat ? <Selected /> : <Unselected />}
                    <RadioText>Gato</RadioText>
                  </RadioButton>
                  <RadioButton onClick={() => setBird(!bird)}>
                    {bird ? <Selected /> : <Unselected />}
                    <RadioText>Pássaro</RadioText>
                  </RadioButton>
                </RadioSelectionDiv>
                <RadioSelectionDiv id="gender">
                  <TitleText className="titles">Gênero</TitleText>
                  <RadioButton onClick={() => setMale(!male)}>
                    {male ? <Selected /> : <Unselected />}
                    <RadioText>Macho</RadioText>
                  </RadioButton>
                  <RadioButton onClick={() => setFemale(!female)}>
                    {female ? <Selected /> : <Unselected />}
                    <RadioText>Fêmea</RadioText>
                  </RadioButton>
                </RadioSelectionDiv>
              </div>
              <ColorsSelection />
            </div>
          </FilterLateralDiv>
        }
        <ResultsDiv style={showMap ? { display: "none" } : { display: "flex" }}>
          {appStore.pets !== undefined && appStore.pets.length === 0 && search &&
            <div id="nothing-found-div">
              <NothingFoundImage src={petsImage} />
            </div>
          }
          {appStore.pets !== undefined && appStore.pets?.length > 0 && !loading &&
            <InfiniteScroll
              dataLength={appStore.pets.length}
              next={() => 1}
              hasMore={true}
              loader={<p></p>}
              endMessage={<p></p>}
            >
              <PetProfileCards from={0} to={appStore.pets.length} />
            </InfiniteScroll>
          }
          {loading && <LoadingScreen />}
        </ResultsDiv>
        <MapContainer style={!showMap ? { display: "none" } : { display: "flex" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY! }}
            defaultCenter={{ lat: -23.5532003, lng: -46.6496674 }}
            defaultZoom={12}
            center={appStore.coords}
            zoom={appStore.mapZoom}
          >
            {appStore.pets && appStore.pets.map((pet: Pet, index: number) => (
              <Marker
                lat={pet.location.coordinates[1]}
                lng={pet.location.coordinates[0]}
                pet={pet}
                index={index}
              />
            ))}
          </GoogleMapReact>
          {loading && <LoadingScreen />}
        </MapContainer>
      </SearchContainer>
      {appStore.showPetProfile && <PetProfile />}
    </>
  )
}
