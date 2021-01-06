import styled from 'styled-components'

export const LoadingDiv = styled.div`
  height: 100%;
  min-height: 100%;
  width: 70vw;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: transparent;
  &, *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    :focus {outline:none !important;}
  }
  @media(max-width: 560px) {
    width: 90vw;
  }
  #container {
    position: relative;
    height: 100px;
    width: 400px;
  }
  #text {
    font-size: 3rem;
    display: flex;
    align-items: center;
    color: ${props => props.theme.dark_grey};
    justify-content: center;
    animation: shine 3.5s linear infinite;
  }
  #balls {
    position: absolute;
    width: 400px;
    height: 100px;
  }
  .ball {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(to right, #6504b5 0%, #9b44ff 100%);
    top: -70px;
    left: 155px;
    animation: bounce 1s ease infinite;
  }
  .ball:nth-last-child(1) {
    top: -110px;
    margin:40px;
    animation-delay: .2s;
  }
  .ball:nth-last-child(2) {
    top: -150px;
    margin:80px;
    animation-delay: .3s;
  }
  @keyframes shine {
    100% { opacity: 1;}
    50% {opacity: .6;}
    0% { opacity: 1;}
  }
  @keyframes bounce {
    0% {transform: scale(1,1) translateY(0)}
    5% {transform: scale(1.1,0.9) translateY(0)}
    50% {transform: scale(0.9,1.1) translateY(-40px)}
    75% {transform: scale(0.9,1.1) translateY(-40)}
    100% {transform: scale(1,1) translateY(0)}
  } 
`
