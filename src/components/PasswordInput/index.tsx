import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import openedEye from '../../assets/images/openedEyeIcon.png';
import blockedEye from '../../assets/images/blockedEyeIcon.png';
import { PasswordInputDiv, InputStyled, ShowBlockPasswordButton, ShowBlockPasswordIcon } from "./styles";

export default function PasswordInput({ placeHolder }: { placeHolder: string }) {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState('password');

  return (
    <PasswordInputDiv id="password-input-div">
      <InputStyled
        autoCapitalize='none'
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = placeHolder}
        type={passwordVisibility}
        maxLength={20}
        placeholder={placeHolder}
        autoCorrect='false'
        onChange={e => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
        value={appStore.password}>
      </InputStyled>
      <ShowBlockPasswordButton type='button'
        onClick={() => passwordVisibility === 'text' ? setPasswordVisibility('password') : setPasswordVisibility('text')}>
        <ShowBlockPasswordIcon src={passwordVisibility === 'text' ? openedEye : blockedEye} />
      </ShowBlockPasswordButton>
    </PasswordInputDiv>
  )
}
