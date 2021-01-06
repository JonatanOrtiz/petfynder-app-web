import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router-dom";
import PasswordInput from '../PasswordInput/index'
import LoadingScreen from '../LoadingScreen/index'
import LogoAndName from '../LogoAndName/index'
import StandardButton from '../StandardButton/index'
import openedEye from '../../assets/images/openedEyeIcon.png';
import blockedEye from '../../assets/images/blockedEyeIcon.png';
import api from '../../services/api';
import { PasswordInputDiv, InputStyled, ShowBlockPasswordButton, ShowBlockPasswordIcon } from "../PasswordInput/styles";
import { ErrorMessage } from "../Login/styles";
import { Container } from "./styles";

export default function ChangePassword() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [facebookVerification, setFacebookVerification] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVisibility, setNewPasswordVisibility] = useState('password');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [newPasswordConfirmationVisibility, setNewPasswordConfirmationVisibility] = useState('password');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const fb = localStorage.getItem("@facebook");
    fb && setFacebookVerification(true);
    firstRender && setFirstRender(false);
  }, []);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appStore.password || appStore.password === '' || !newPassword || newPassword === '' || !newPasswordConfirmation || newPasswordConfirmation === '') {
      setErrorMessage('Todos os campos devem ser preenchidos!')
      return
    }
    if (newPassword !== newPasswordConfirmation) {
      setErrorMessage('A nova senha não coincide com a confirmação de senha!')
      return
    }
    if (newPassword.length < 10) {
      setErrorMessage('A nova senha deve ter ao menos 10 dígitos')
      return
    }
    setLoading(true)
    await api.put(`authenticate/${appStore.userId}`, { newPassword: newPassword, oldPassword: appStore.password })
      .then((response) => {
        e.persist();
        setLoading(false)
        alert(response.data.success);
        alert("Entre com sua nova senha");
        dispatch({ type: "SET_USER_ID", payload: '' });
        setTimeout(() => {
          dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: true });
          history.push("/account");
        }, 500);
      })
      .catch((error) => {
        e.persist();
        setLoading(false)
        setErrorMessage(error.response.data.error);
        return
      });
  }

  return (
    <Container>
      {!firstRender &&
        <>
          <LogoAndName />
          {facebookVerification ?
            <div id="message-div">
              <p>{"Sua conta está vinculada ao Facebook."}</p>
              <p>{"Contas vinculadas não necessitam de senha."}</p>
            </div>
            :
            <form>
              <PasswordInput placeHolder="Digite sua senha" />
              <PasswordInputDiv>
                <InputStyled
                  autoCapitalize='none'
                  onFocus={(e) => e.target.placeholder = ''}
                  onBlur={(e) => e.target.placeholder = 'Digite a nova senha'}
                  type={newPasswordVisibility}
                  maxLength={20}
                  placeholder='Digite a nova senha'
                  autoCorrect='false'
                  onChange={e => setNewPassword(e.target.value)}
                  value={newPassword}>
                </InputStyled>
                <ShowBlockPasswordButton type='button'
                  onClick={() => newPasswordVisibility === 'text' ? setNewPasswordVisibility('password') : setNewPasswordVisibility('text')}>
                  <ShowBlockPasswordIcon src={newPasswordVisibility === 'text' ? openedEye : blockedEye} />
                </ShowBlockPasswordButton>
              </PasswordInputDiv>
              <PasswordInputDiv>
                <InputStyled
                  autoCapitalize='none'
                  onFocus={(e) => e.target.placeholder = ''}
                  onBlur={(e) => e.target.placeholder = 'Confirme a nova senha'}
                  type={newPasswordConfirmationVisibility}
                  maxLength={20}
                  placeholder='Confirme a nova senha'
                  autoCorrect='false'
                  onChange={e => setNewPasswordConfirmation(e.target.value)}
                  value={newPasswordConfirmation}>
                </InputStyled>
                <ShowBlockPasswordButton type='button'
                  onClick={() => newPasswordConfirmationVisibility === 'text' ? setNewPasswordConfirmationVisibility('password') : setNewPasswordConfirmationVisibility('text')}>
                  <ShowBlockPasswordIcon src={newPasswordConfirmationVisibility === 'text' ? openedEye : blockedEye} />
                </ShowBlockPasswordButton>
              </PasswordInputDiv>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              <StandardButton title='Atualizar' handleClick={(e) => changePassword(e)} />
            </form>
          }
          {loading && <LoadingScreen />}
        </>
      }
    </Container>
  );
}
