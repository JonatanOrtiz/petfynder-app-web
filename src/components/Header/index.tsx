import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { useLocation } from 'react-router-dom'
import profileIcon from '../../assets/images/profileIcon.png'
import redProfileIcon from '../../assets/images/redProfileIcon.png'
import blackFavoriteIcon from '../../assets/images/blackFavoriteIcon.png'
import redFavoriteIcon from '../../assets/images/redFavoriteIcon.png'
import menuIcon from '../../assets/images/menuIcon.png'
import closeIcon from '../../assets/images/xIcon.png'
import contrast from '../../assets/images/contrast.png'
import contrastWhite from '../../assets/images/contrastWhite.png'
import Home from '../../pages/Home'
import Register from '../../pages/Register'
import Update from '../../pages/Update'
import Search from '../../pages/Search'
import Account from '../../pages/Account'
import Rescued from '../../pages/Rescued'
import { Switch, Route, Link } from "react-router-dom";
import {
  HeaderContainer, LogoTitle, HeaderIcons, NavDiv, LogoButton, MenuButton, MenuOptionsDiv,
  CloseButton
} from './styles'

export default function Header() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showOptions, setShowOptions] = useState(true);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  // const ref = useRef<any>(null);

  useEffect(() => {
    // document.addEventListener("click", useOutsideClick);
    window.innerWidth >= 750 ? setShowOptions(true) : setShowOptions(false);
    // return () => { document.removeEventListener("click", useOutsideClick) };
  }, []);

  // const useOutsideClick = (e: any) => {
    // if (ref.current && !ref.current!.contains(e.target)) {
      // if (showMenuOptions) {
        // setShowMenuOptions(false);
      // }
    // };
  // }

  function menuVisible() {
    setShowMenuOptions(true);
  }

  function menuHidden() {
    setShowMenuOptions(false);
  }

  const changeMenuStyle = () => {
    if (window.innerWidth >= 750) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
    setShowMenuOptions(false)
  }

  const changeTheme = () => {
    if (appStore.theme === "light") {
      dispatch({ type: "SET_THEME", payload: "dark" });
      localStorage.setItem("@theme", "dark");
    } else {
      dispatch({ type: "SET_THEME", payload: "light" });
      localStorage.setItem("@theme", "light");
    }
  }

  window.addEventListener('resize', changeMenuStyle);

  return (
    <>
      <HeaderContainer style={location.pathname === "/" ? { position: "fixed" } : { position: "sticky" }}>
        <Link to={{ pathname: "/", state: { prevPath: location.pathname } }}>
          <LogoButton onClick={() => setShowMenuOptions(false)} >
            <LogoTitle>Petfynder</LogoTitle>
          </LogoButton>
        </Link>
        <NavDiv>
          {showOptions ?
            <>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
              <li>
                <Link to="/search">Buscar</Link>
              </li>
              <li>
                <Link to="/rescued-pets">Resgatados</Link>
              </li>
              <li title="Favoritos">
                <Link to="/account">
                  <HeaderIcons onClick={() => dispatch({ type: "SET_FAVORITES_ROUTE", payload: true })}
                    onMouseOver={e => (e.currentTarget.src = redFavoriteIcon)}
                    onMouseOut={e => (e.currentTarget.src = blackFavoriteIcon)}
                    src={blackFavoriteIcon} />
                </Link>
              </li>
              <li title="Mudar tema">
                <button
                  onClick={changeTheme}>
                  <HeaderIcons onMouseOver={e => (e.currentTarget.src = contrastWhite)}
                    onMouseOut={e => (e.currentTarget.src = contrast)}
                    src={contrast} />
                </button>
              </li>
              <li title="Conta">
                <Link to="/account">
                  <HeaderIcons onMouseOver={e => (e.currentTarget.src = redProfileIcon)}
                    onMouseOut={e => (e.currentTarget.src = profileIcon)}
                    src={profileIcon} />
                </Link>
              </li>
            </>
            :
            <>
              <button title="Mudar tema"
                onClick={changeTheme}>
                <HeaderIcons onMouseOver={e => (e.currentTarget.src = contrastWhite)}
                  onMouseOut={e => (e.currentTarget.src = contrast)}
                  src={contrast} />
              </button>
              {!showMenuOptions ?
                <MenuButton onClick={() => menuVisible()}>
                  <HeaderIcons src={menuIcon} />
                </MenuButton>
                :
                <CloseButton onClick={() => menuHidden()}>
                  <HeaderIcons src={closeIcon} />
                </CloseButton>
              }
            </>
          }
        </NavDiv>
      </HeaderContainer>
      {showMenuOptions &&
        <MenuOptionsDiv
          // ref={ref}
          tabIndex={0}
          onBlur={() => menuHidden()}
          style={location.pathname === "/" ? { position: "fixed" } : { position: "absolute" }}>
          <li>
            <Link onClick={() => setShowMenuOptions(false)} to="/account">{appStore.userId !== "" ? "Conta" : "Login"}</Link>
          </li>
          <li>
            <Link
              onClick={() => [setShowMenuOptions(false), dispatch({ type: "SET_FAVORITES_ROUTE", payload: true })]}
              to="/account">Favoritos</Link>
          </li>
          <li>
            <Link onClick={() => setShowMenuOptions(false)} to="/register">Cadastrar</Link>
          </li>
          <li>
            <Link onClick={() => setShowMenuOptions(false)} to="/search">Buscar</Link>
          </li>
          <li>
            <Link onClick={() => setShowMenuOptions(false)} to="/rescued-pets">Resgatados</Link>
          </li>
        </MenuOptionsDiv>
      }
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/update">
          <Update />
        </Route>
        <Route path="/rescued-pets">
          <Rescued />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
}
