import React, { useState } from 'react';
// import api from '../../services/api';
import PasswordInput from '../../components/PasswordInput/index'
import LoadingScreen from '../../components/LoadingScreen/index'
import LogoAndName from '../../components/LogoAndName/index'
import FacebookButton from '../../components/FacebookButton/index'

interface userData {
  userId?: String;
  setUserId(): void;
}

export default function DeleteAccountFacebook() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className='container'>
        <LogoAndName />
        <div style={{ marginBottom: '10rem' }} />
        <FacebookButton title='Excluir minha conta' handleClick={() => {/*handleLogin()*/ }} />
      </div>
      {loading &&
        <LoadingScreen />
      }
    </>
  );
}
