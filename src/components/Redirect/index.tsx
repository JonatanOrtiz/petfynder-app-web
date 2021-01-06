import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router-dom";

export default function Redirect() {
  const appStore = useSelector((reduxState: RootState) => reduxState.appReducer);
  const history = useHistory();

  useEffect(() => {
    redirect();
  }, [])

  const redirect = () => {
    if (appStore.userId) {
      history.push("/account");
    } else {
      history.push("/");
    }
  }

  return (
    <></>
  );
}
