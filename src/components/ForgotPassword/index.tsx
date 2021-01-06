import React, { useState } from 'react';
// import api from '../../services/api';
import EmailInput from '../../components/EmailInput/index'
import LoadingScreen from '../../components/LoadingScreen/index'
import LogoAndName from '../../components/LogoAndName/index'
import StandardButton from '../../components/StandardButton/index'

interface userData {
  userId?: String;
  setUserId(): void;
}

export default function Login() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className='container'>
        <LogoAndName />
        <form>
          <EmailInput />
          <StandardButton title='Enviar' handleClick={() => {/*handleLogin()*/}} />
        </form>
      </div>
      {loading &&
        <LoadingScreen />
      }
    </>
  );
}
