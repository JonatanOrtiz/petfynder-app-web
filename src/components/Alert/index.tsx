import React, { useState } from 'react';
import { Container } from './styles';

interface AlertProps {
  showButtons: boolean;
  message: string;
  confirm: () => void;
  cancel: () => void;
}

export default function Alert({ showButtons, message, confirm, cancel }: AlertProps) {
  const [close, setClose] = useState(false);

  function changeOpacity() {
    setClose(true);
  }

  return (
    <Container style={close ? { opacity: 0 } : { opacity: 1 }}>
      <div id="alert-internal-div">
        <p>{message}</p>
        {showButtons &&
          <div>
            <button
              onClick={() => [cancel(), changeOpacity()]}>
              Cancelar
            </button>
            <button
              onClick={() => confirm()}>
              Confirmar
            </button>
          </div>
        }
      </div>
    </Container>
  );
}
