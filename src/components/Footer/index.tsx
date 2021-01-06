import React from 'react'
import LogoAndName from "../../components/LogoAndName"
import { FooterContainer, About, ContactUs, OurApp } from './styles'

export default function Footer() {
  return (
    <FooterContainer>
      <div id="logo-and-name-div" >
        <LogoAndName />
      </div>
      <div id="information-div" >
        <OurApp>
          <h1>Instale nosso app</h1>
          <h2>
            <a target="_blank" rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.petfynder&hl=pt_BR&gl=US" >
              Petfynder
          </a>
          </h2>
        </OurApp>
        <About>
          <h1>Sobre nós</h1>
          <h2>
            <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/O-Aplicativo-Petfynder/" >
              Quem somos
          </a>
          </h2>
          <h2>
            <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Politica-de-Privacidade-Petfynder/#cookies-policy" >
              Política de Cookies
          </a>
          </h2>
          <h2>
            <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Politica-de-Privacidade-Petfynder/" >
              Política de Privacidade
          </a>
          </h2>
          <h2>
            <a target="_blank" rel="noopener noreferrer"
              href="https://jonatanortiz.github.io/Termos-de-Uso-Petfynder/" >
              Termos de Uso
          </a>
          </h2>
        </About>
        <ContactUs>
          <h1>Fale conosco</h1>
          <h2>Horário de atendimento:</h2>
          <h2>De segunda a sexta,das 9hs às 18hs.</h2>
          <h2>Sábados das 9hs às 13hs.</h2>
          <h2>Demais períodos apenas via e-mail</h2>
          <h2>(44) 99163-7767</h2>
          <h2>petfynder.adm@gmail.com</h2>
        </ContactUs>
      </div>
    </FooterContainer>
  )
}
