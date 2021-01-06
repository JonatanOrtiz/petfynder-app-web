import React from "react"
import { useSelector, useDispatch } from "react-redux"
import ColorsSelection from "../../components/ColorsSelection"
import { RootState } from "../../store"
import {
  Container, AnimalAngGenderDiv, TitleText, RadioSelectionDiv, RadioButton,
  BorderSelected, BorderUnselected, CenterSelected, CenterUnselected, RadioText
} from "./styles"

export default function Search() {
  const petStore = useSelector((reduxState: RootState) => reduxState.petReducer);
  const dispatch = useDispatch();

  const Selected = () => <BorderSelected><CenterSelected /></BorderSelected>;
  const Unselected = () => <BorderUnselected><CenterUnselected /></BorderUnselected>;

  return (
    <Container id="radio-selection-container">
      <AnimalAngGenderDiv>
        <RadioSelectionDiv>
          <TitleText className="titles">Espécie</TitleText>
          <RadioButton onClick={() => dispatch({ type: "SET_ANIMAL", payload: "Cão" })}>
            {petStore.animal === "Cão" ? <Selected /> : <Unselected />}
            <RadioText>Cachorro</RadioText>
          </RadioButton>
          <RadioButton onClick={() => dispatch({ type: "SET_ANIMAL", payload: "Gato" })}>
            {petStore.animal === "Gato" ? <Selected /> : <Unselected />}
            <RadioText>Gato</RadioText>
          </RadioButton>
          <RadioButton onClick={() => dispatch({ type: "SET_ANIMAL", payload: "Ave" })}>
            {petStore.animal === "Ave" ? <Selected /> : <Unselected />}
            <RadioText>Pássaro</RadioText>
          </RadioButton>
        </RadioSelectionDiv>
        <RadioSelectionDiv id="gender">
          <TitleText className="titles">Gênero</TitleText>
          <RadioButton onClick={() => dispatch({ type: "SET_GENDER", payload: "Macho" })}>
            {petStore.gender === "Macho" ? <Selected /> : <Unselected />}
            <RadioText>Macho</RadioText>
          </RadioButton>
          <RadioButton onClick={() => dispatch({ type: "SET_GENDER", payload: "Fêmea" })}>
            {petStore.gender === "Fêmea" ? <Selected /> : <Unselected />}
            <RadioText>Fêmea</RadioText>
          </RadioButton>
        </RadioSelectionDiv>
      </AnimalAngGenderDiv>
      <ColorsSelection />
    </Container>
  )
}
