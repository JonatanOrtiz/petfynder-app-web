import React from 'react'
import { LoadingDiv } from "./styles";

export default function LoadingScreen() {

  return (
    <LoadingDiv id="loading-screen">
      <div id="container">
        {/* <div id="text">Carregando...</div> */}
        <div id="balls">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </div>
      </div>
    </LoadingDiv>
  )
}
