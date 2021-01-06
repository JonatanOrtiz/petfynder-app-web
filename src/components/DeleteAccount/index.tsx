import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import FacebookLogin from 'react-facebook-login'
import PasswordInput from '../../components/PasswordInput/index'
import LoadingScreen from '../../components/LoadingScreen/index'
import LogoAndName from '../../components/LogoAndName/index'
import StandardButton from '../../components/StandardButton/index'
import facebookIcon from '../../assets/images/facebookIcon.png'
import { Container } from "../ChangePassword/styles";
import { FacebookButtonDiv, FacebookIcon } from "../Login/styles";
import { ErrorMessage } from "../Login/styles";

export default function DeleteAccount() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [facebookVerification, setFacebookVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const fb = localStorage.getItem("@facebook");
    fb && setFacebookVerification(true);
    firstRender && setFirstRender(false);
  }, [])

  async function deleteAccount(e: React.FormEvent) {
    e.preventDefault();
    if (!appStore.password || appStore.password === '') {
      setErrorMessage('Preencha a senha!')
      return
    }
    setLoading(true);
    await api.delete(`user/${appStore.userId}`, { headers: { password: appStore.password } })
      .then(async () => {
        setLoading(false);
        alert('Conta excluída!')
        localStorage.removeItem('@userId');
        localStorage.removeItem('@facebook');
        dispatch({ type: 'SET_USER_ID', payload: '' });
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.error);
        return
      });
  }

  async function facebookLogin() {
    setLoading(true);
    await api.delete(`user/${appStore.userId}`)
      .then(async () => {
        setLoading(false);
        alert('Conta excluída!')
        localStorage.removeItem('@userId');
        localStorage.removeItem('@facebook');
        dispatch({ type: 'SET_USER_ID', payload: '' });
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.error)
        return
      });
  }

  const componentClicked = () => { };

  return (
    <Container>
      {!firstRender &&
        <>
          <div style={{ marginTop: "2rem" }} />
          <LogoAndName />
          <form>
            {!facebookVerification && <PasswordInput placeHolder="Digite sua senha" />}
            <ErrorMessage>{errorMessage}</ErrorMessage>
            {facebookVerification &&
              <FacebookButtonDiv style={{ padding: "0 6rem 0 4rem" }} >
                <FacebookIcon src={facebookIcon} />Excluir Conta
              <FacebookLogin
                  appId="838247080259738"
                  // appId={process.env.REACT_APP_FACEBOOK_ID!}
                  textButton=""
                  fields="email"
                  buttonStyle={{
                    height: "100%", width: "100%", position: "absolute", border: 0,
                    borderRadius: "1rem", background: "transparent", top: 0, left: 0
                  }}
                  onClick={componentClicked}
                  callback={facebookLogin} />
              </FacebookButtonDiv>
            }
            {!facebookVerification && <StandardButton title='Excluir conta' handleClick={(e) => deleteAccount(e)} />}
          </form>
          {loading && <LoadingScreen />}
        </>
      }
    </Container>
  );
}
