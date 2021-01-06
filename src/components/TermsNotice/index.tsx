import React, { useState } from 'react';
import { Container } from './styles';

export default function TermsNotice() {
  const [showTermsNotice, setShowTermsNotice] = useState(true);

  const hideTermsNotice = () => {
    localStorage.setItem("@termsAccepted", "termsAccepted");
    setShowTermsNotice(false);
  }

  return (
    <>
      {showTermsNotice &&
        <Container>
          <p>Ao utilizar nosso site você está concordando com nossa
        <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Politica-de-Privacidade-Petfynder/#cookies-policy"> Política de Cookies</a>, nossa
        <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Politica-de-Privacidade-Petfynder/"> Política de Privacidade </a>
        e com nossos
        <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Termos-de-Uso-Petfynder/"> Termos de Uso.</a>
          </p>
          <button onClick={hideTermsNotice} id="close-terms-notice">X</button>
        </Container>
      }
    </>
  );
}
