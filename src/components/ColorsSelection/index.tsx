import React from "react"
import { useSelector, useDispatch } from "react-redux"
import "react-datepicker/dist/react-datepicker.css";
import { RootState } from "../../store"
import {
  RadioSelectionDiv, RadioButton, BorderSelected,
  BorderUnselected, CenterSelected, CenterUnselected, RadioText, TitleText
} from "../../pages/Search/styles"

const colorsArray = [
  "preto", "branco", "cinza",
  "marrom", "bege", "laranja",
  "amarelo", "vermelho", "rosa",
  "roxo", "azul", "verde",
]

export default function ColorsSelection() {
  const petStore = useSelector((reduxState: RootState) => reduxState.petReducer);
  const dispatch = useDispatch();

  const Selected = () => <BorderSelected><CenterSelected /></BorderSelected>;
  const Unselected = () => <BorderUnselected><CenterUnselected /></BorderUnselected>;

  const SetColorPositionInArray = (color: string) => {
    let newArray = petStore.colors.slice(0);
    const index = newArray.indexOf(color);
    if (newArray.includes(color)) {
      newArray.splice(index, 1);
    } else if (newArray.length === 0) {
      newArray = [color];
    } else {
      newArray.push(color);
    }
    dispatch({ type: "SET_COLORS", payload: newArray });
  }

  return (
    <>
      <div id="colors-selection-container">
        <TitleText className="titles" style={{ marginTop: "2rem" }}>Cores</TitleText>
        <RadioSelectionDiv id="colors">
          {colorsArray.map((color, index) => (
            <RadioButton key={index} onClick={() => SetColorPositionInArray(color)}>
              {petStore.colors.includes(color) ? <Selected /> : <Unselected />}
              <RadioText>{color.replace(/^\w/, (c) => c.toUpperCase())}</RadioText>
            </RadioButton>
          ))}
        </RadioSelectionDiv>
      </div>
    </>
  )
}
