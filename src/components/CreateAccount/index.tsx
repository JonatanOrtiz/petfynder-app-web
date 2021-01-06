import React, { useState } from 'react';
// import api from '../../services/api';
import EmailInput from '../EmailInput/index'
import PasswordInput from '../PasswordInput/index'
import LoadingScreen from '../LoadingScreen/index'
import LogoAndName from '../LogoAndName/index'
import StandardButton from '../StandardButton/index'

interface userData {
  userId?: String;
  setUserId(): void;
}

export default function CreateAccount() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className='container'>
        <LogoAndName />
        <form>
          <EmailInput />
          <PasswordInput placeHolder={"Crie sua senha"} />
          <StandardButton title='Cadastrar' handleClick={() => {/*handleLogin()*/ }} />
        </form>
      </div>
      {loading &&
        <LoadingScreen />
      }
    </>
  );
}
