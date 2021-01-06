import React, { useState, useEffect } from "react"
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
// import states from "../../statesAndCities"
import axios from "axios";

interface Estado {
  sigla: string;
  nome: string;
  cidades: string[];
}

interface Estados extends Array<Estado> { };

interface Brasil {
  estados: Estados;
}

interface CidadeLatLng {
  nome: string;
  lat: number;
  lng: number;
}

interface CidadesLatLng extends Array<CidadeLatLng> { };

export default function Search() {
  const petStore = useSelector((reduxState: RootState) => reduxState.petReducer);
  const dispatch = useDispatch();
  const [states, setStates] = useState<Estados>([]);
  // const [state, setState] = useState("");
  const [cities, setCities] = useState<Array<string>>([]);
  const [cidadesLatLng, setCidadesLatLng] = useState<CidadesLatLng>();

  useEffect(() => {
    async function loadStatesAndCities() {
      const response =
        await axios.get<Brasil>("https://gist.githubusercontent.com/"
          + "JonatanOrtiz/27c13903f019f8821bd31e80bb83be2b/raw/"
          + "2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json");

      const estados = response.data.estados

      const blankState = [{
        sigla: "",
        nome: "",
        cidades: [""],
      }];

      setStates(blankState.concat(estados));

      if (petStore.user) {
        const newState = response.data.estados.filter((estado) => estado.sigla === petStore.state);
        
        const cidades = [""].concat(newState[0].cidades);
        setCities(cidades);
      }
    }

    loadStatesAndCities();
  }, []);

  useEffect(() => {
    async function loadCidadesLatLng() {
      const response =
        await
          axios.get<CidadesLatLng>
            ("https://raw.githubusercontent.com/JonatanOrtiz/Municipios-Brasileiros/main/json/municipios.json");

      setCidadesLatLng(response.data);
    }
    loadCidadesLatLng();
  }, []);

  useEffect(() => {
    if (petStore.state === "") {
      // setState("");
      setCities([]);
    }
  }, [petStore]);

  const statesOptions = states.map((estado: Estado, index: number) => ({
    key: index,
    text: estado.nome,
    value: estado.nome,
  }));

  const citiesOptions = cities.map((cidade: string, index) => ({
    key: index,
    text: cidade,
    value: cidade,
  }));

  const SetStateAndCitiesFromSelectedState = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    states.forEach(function (state: Estado) {
      if (state.nome === value) {
        // setState(value);
        // alert(value);
        dispatch({ type: "SET_STATE", payload: state.sigla });
        const cidades = [""].concat(state.cidades);
        setCities(cidades);
      }
      dispatch({ type: "SET_CITY", payload: "" });
      dispatch({ type: "SET_LOCATION", payload: { coordinates: [0, 0] } });
    });
  }

  const SetCityAndCoords = (value: string) => {
    dispatch({ type: "SET_CITY", payload: value });
    cidadesLatLng!.forEach(function (cidade: CidadeLatLng) {
      if (cidade.nome === value) {
        dispatch({ type: "SET_COORDS", payload: { lat: cidade.lat, lng: cidade.lng } });
        dispatch({ type: "SET_MAP_ZOOM", payload: 14 });
        dispatch({ type: "SET_LOCATION", payload: { coordinates: [0, 0] } });
      }
    });
  }

  return (
    <>
      <div id="dropdown-div">
        <Dropdown
          style={{ "border-radius": 8, "color": "#515151", "border": 0, "box-shadow": "0px 1px 3px 0px #dedede" }}
          placeholder="Estado" search selection options={statesOptions}
          onChange={SetStateAndCitiesFromSelectedState}
          value={Object.values(states.filter(({sigla}) => sigla === petStore.state)).reduce((t, e) => e.nome, "0")} />
        <Dropdown
          style={{ "border-radius": 8, "color": "#515151", "border": 0, "box-shadow": "0px 1px 3px 0px #dedede" }}
          placeholder="Cidade" search selection options={citiesOptions}
          onChange={(e, { value }) => SetCityAndCoords(String(value))}
          value={petStore.city} />
      </div>
    </>
  )
}
