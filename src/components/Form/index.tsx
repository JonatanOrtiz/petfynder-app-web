import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import StatesAndCitiesPicker from "../../components/StatesAndCitiesPicker"
import { Container, Input, TextAreaDiv, TextArea } from './styles'

export default function Form() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petStore = reduxState.petReducer;
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();

  function phoneFormat(phoneValue: string) {
    phoneValue = phoneValue.replace(/\D/g, '');
    phoneValue = phoneValue.replace(/\b(?=(\d))/g, '(');
    phoneValue = phoneValue.replace(/^(\D\d{2})(\d)/g, '($1) $2');
    phoneValue = phoneValue.replace(/^(\D{2})/g, '(');
    phoneValue = phoneValue.replace(/(\d)(\d{4})$/g, '$1-$2');
    phoneValue = phoneValue.replace(/(\d)(\d{4})/g, '$1-$2');
    dispatch({ type: 'SET_PHONE', payload: phoneValue })
  }

  return (
    <Container>
      {appStore.lostOrFound === "lost" &&
        <Input
          autoCapitalize='none'
          maxLength={60}
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Nome'}
          placeholder='Nome'
          autoCorrect='false'
          onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })}
          value={petStore.name}>
        </Input>
      }
      <Input
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Raça'}
        placeholder='Raça'
        autoCorrect='false'
        onChange={e => dispatch({ type: 'SET_BREED', payload: e.target.value })}
        value={petStore.breed}>
      </Input>
      <StatesAndCitiesPicker />
      <Input
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Bairro'}
        placeholder='Bairro'
        autoCorrect='false'
        onChange={e => dispatch({ type: 'SET_DISTRICT', payload: e.target.value })}
        value={petStore.district}>
      </Input>
      <Input
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Rua/Avenida/Lote...N°'}
        placeholder='Rua/Avenida/Lote...N°'
        autoCorrect='false'
        onChange={e => dispatch({ type: 'SET_STREET', payload: e.target.value })}
        value={petStore.street}>
      </Input>
      <Input
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Telefone para contato'}
        placeholder='Telefone para contato'
        autoCorrect='false'
        onChange={e => phoneFormat(e.target.value)}
        value={petStore.phone}>
      </Input>
      <Input
        autoCapitalize='none'
        maxLength={60}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Nome do contato'}
        placeholder='Nome do contato'
        autoCorrect='false'
        onChange={e => dispatch({ type: 'SET_CONTACT_NAME', payload: e.target.value })}
        value={petStore.contactName}>
      </Input>
      <TextAreaDiv style={appStore.lostOrFound === "lost" ? { height: "16.5rem" } : { height: "23rem" }}>
        <p className="generic-text">Descreva detalhes que você considera importantes:</p>
        <TextArea
          autoCapitalize='none'
          maxLength={500}
          autoCorrect='false'
          onChange={e => dispatch({ type: 'SET_ABOUT', payload: e.target.value })}
          value={petStore.about}>
        </TextArea>
      </TextAreaDiv>
    </Container>
  );
}
