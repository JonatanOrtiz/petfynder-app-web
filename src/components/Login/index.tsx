import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import EmailInput from '../../components/EmailInput/index'
import PasswordInput from '../../components/PasswordInput/index'
import LoadingScreen from '../../components/LoadingScreen/index'
import LogoAndName from '../../components/LogoAndName/index'
import StandardButton from '../../components/StandardButton/index'
import facebookIcon from '../../assets/images/facebookIcon.png';
import closeIcon from '../../assets/images/closeIcon.png'
import whiteCloseIcon from '../../assets/images/whiteCloseIcon.png'
import Alert from "../../components/Alert"
import api from '../../services/api';
import { InputStyled } from "../EmailInput/styles";
import {
  Container, InternalDiv, CloseButton, ErrorMessage, FacebookIcon,
  FacebookButtonDiv, ForgotPasswordLoginDiv, OrText, OrDiv
} from "./styles";

export default function Login() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountOptions, setAccountOptions] = useState("login");
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<any>();

  useEffect(() => {
    setErrorMessage("");
  }, [appStore, token, accountOptions]);

  async function registration(e: React.FormEvent) {
    e.preventDefault();
    if (!appStore.email || appStore.email === '' || !appStore.password || appStore.password === '') {
      setErrorMessage('Todos os campos devem ser preenchidos!')
      return
    }
    if (appStore.password.length < 10) {
      setErrorMessage('A senha deve ter ao menos 10 dígitos')
      return
    }
    setLoading(true);
    await api.post('user/', { email: appStore.email, password: appStore.password })
      .then(async (response) => {
        setLoading(false);
        const id = { id: response.data };
        sigIn(id);
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error)
        } else {
          setErrorMessage('Erro ao registrar');
        }
        return
      });
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!appStore.email || appStore.email === '' || !token || token === '' || !appStore.password || appStore.password === '') {
      setErrorMessage('Todos os campos devem ser preenchidos!')
      return
    }
    if (appStore.password.length < 10) {
      setErrorMessage('A nova senha deve ter ao menos 10 dígitos')
      return
    }
    setLoading(true);
    await api.post('reset_password/', { email: appStore.email, token: token, password: appStore.password })
      .then(async (response) => {
        setLoading(false);
        setAlertProps({
          showButtons: false,
          message: "Nova senha cadastrada com sucesso! \nEntre com sua nova senha.",
          function: () => { }
        })
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        dispatch({ type: "SET_USER_ID", payload: '' });
        setTimeout(() => {
          setAccountOptions("login");
        }, 3100);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error)
        }
        console.log(error);
        return
      });
  }

  async function sendMail(e: React.FormEvent) {
    e.preventDefault();
    if (!appStore.email || appStore.email === '') {
      setErrorMessage('Digite o email de cadastro!')
      return
    }
    setLoading(true);
    await api.post('forgot_password/', { email: appStore.email })
      .then((response) => {
        setLoading(false);
        setAccountOptions("tokenUpdatePassword");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.error);
        return
      });
  }


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!appStore.email || appStore.email === '' || !appStore.password || appStore.password === '') {
      setErrorMessage('Todos os campos devem ser preenchidos!')
      return
    }
    setLoading(true);
    await api.post('authenticate/', { email: appStore.email, password: appStore.password })
      .then(async (response: any) => {
        setLoading(false);
        sigIn(response.data);
      })
      .catch((error: any) => {
        setLoading(false);
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error)
        } else {
          setErrorMessage('Erro ao fazer login')
        }
        return
      });
  }

  function sigIn(response: any) {
    const { id } = response;
    localStorage.setItem('@userId', id);
    closeScreen();
    setTimeout(async () => {
      dispatch({ type: 'SET_USER_ID', payload: id })
      if (location.pathname === "/search" || location.pathname === "/") {
        const userResponse = await api.get(`user/lost/${id}`);
        const favorites = userResponse.data.lostFavorites.concat(userResponse.data.foundFavorites);
        dispatch({ type: "SET_FAVORITES", payload: favorites });
      }
    }, 300);
    if (appStore.favoritesRoute) {
      dispatch({ type: "SET_FAVORITES_ROUTE", payload: false });
      setTimeout(() => {
        dispatch({ type: "SET_FAVORITES_ROUTE", payload: true });
      }, 1000);
    }
  }

  async function facebookLogin(facebookResponse: any) {
    setLoading(true);
    const { email } = facebookResponse;
    await api.post('user/facebook/', { email: email })
      .then(async (response) => {
        setLoading(false);
        if (response.data.user) {
          sigIn(response.data);
        } else {
          const id = { id: response.data };
          sigIn(id);
        }
        localStorage.setItem('@facebook', 'facebook')
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error)
        } else {
          setErrorMessage('Erro ao fazer login')
        }
        return
      });
  }

  const componentClicked = () => { };

  function closeScreen() {
    document.getElementById("login-container")!.style.opacity = "0";
    setTimeout(() => {
      dispatch({ type: "SET_SHOW_ACCOUNT_OPTIONS_SCREEN", payload: false });
    }, 600);
  }

  return (
    <>
      <Container id="login-container">
        <InternalDiv>
          <LogoAndName />
          <form id="login-form">
            <EmailInput />
            {accountOptions === "tokenUpdatePassword" &&
              <>
                <div id="token-input-div">
                  <InputStyled
                    autoCapitalize='none'
                    maxLength={60}
                    placeholder='Digite o token recebido'
                    autoCorrect='false'
                    onChange={e => setToken(e.target.value)}
                    value={token}>
                  </InputStyled>
                </div>
                <PasswordInput placeHolder="Digite sua nova senha" />
              </>
            }
            {accountOptions !== "tokenUpdatePassword" && accountOptions !== "ForgotPassword" &&
              <PasswordInput placeHolder="Digite sua senha" />
            }
            <ErrorMessage>{errorMessage}</ErrorMessage>
            {accountOptions === "login" &&
              <StandardButton title='Entrar' handleClick={(e) => handleLogin(e)} />
            }
            {accountOptions === "createAccount" &&
              <StandardButton title='Criar Conta' handleClick={(e) => { registration(e) }} />
            }
            {accountOptions === "ForgotPassword" &&
              <StandardButton title='Enviar' handleClick={(e) => { sendMail(e) }} />
            }
            {accountOptions === "tokenUpdatePassword" &&
              <StandardButton title='Salvar' handleClick={(e) => { updatePassword(e) }} />
            }
          </form>
          {accountOptions !== "tokenUpdatePassword" &&
            <ForgotPasswordLoginDiv id="forgot-password-div" >
              <button onClick={() => setAccountOptions("ForgotPassword")} >Esqueci minha senha</button>
              <p id="division-line" >|</p>
              <button onClick={() => setAccountOptions("createAccount")} >Quero criar uma conta</button>
            </ForgotPasswordLoginDiv>
          }
          <OrDiv>
            <OrText>&#8212;&#8212; ou &#8212;&#8212;</OrText>
          </OrDiv>
          {accountOptions === "login" ?
            <FacebookButtonDiv id="facebook-button-div" >
              <FacebookIcon src={facebookIcon} />
              Entrar com o Facebook
              <FacebookLogin
                // isMobile={false}
                disableMobileRedirect={true}
                appId={process.env.REACT_APP_FACEBOOK_ID!}
                textButton=""
                fields="email"
                buttonStyle={{
                  height: "100%", width: "100%", position: "absolute", border: 0,
                  borderRadius: "1rem", background: "transparent", top: 0, left: 0
                }}
                onClick={componentClicked}
                callback={facebookLogin} />
            </FacebookButtonDiv>
            :
            <StandardButton title='Login' handleClick={() => setAccountOptions("login")} />
          }
          <CloseButton id="close-button" onClick={() => closeScreen()}>
            <img src={appStore.theme === "light" ? closeIcon : whiteCloseIcon} />
          </CloseButton>
        </InternalDiv>
        {loading && <LoadingScreen />}
      </Container>
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
