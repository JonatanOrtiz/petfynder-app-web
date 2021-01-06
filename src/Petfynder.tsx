import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Layout from './components/Layout/index'
import TermsNotice from './components/TermsNotice/index'
import GlobalStyle from "./assets/styles/global";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './assets/styles/globalColors';
import { BrowserRouter as Router } from "react-router-dom";
import api from "./services/api"

function Petfynder() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const [hideTermsNotice, setHideTermsNotice] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("@userId");
    const theme = localStorage.getItem("@theme");
    const termsAccepted = localStorage.getItem("@termsAccepted");
    theme && dispatch({ type: "SET_THEME", payload: theme });
    termsAccepted && setHideTermsNotice(true);
    async function getFavorites() {
      const response = await api.get(`user/lost/${userId}`);
      const favorites = response.data.lostFavorites.concat(response.data.foundFavorites);
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    }
    if (userId) {
      dispatch({ type: "SET_USER_ID", payload: userId });
      getFavorites();
    }
    setFirstRender(false);
  }, []);

  return (
    <Router>
      <ThemeProvider theme={appStore.theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        {!firstRender && <Layout />}
        {!hideTermsNotice && <TermsNotice />}
      </ThemeProvider>
    </Router>
  );
}

export default Petfynder;
