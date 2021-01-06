import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { EmailInputDiv, InputStyled } from "./styles";

export default function EmailInput() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();

  return (
    <EmailInputDiv id="email-input-div">
      <InputStyled
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Digite seu e-mail'}
        placeholder='Digite seu e-mail'
        autoCorrect='false'
        onChange={e => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
        value={appStore.email}>
      </InputStyled>
    </EmailInputDiv>
  )
}
