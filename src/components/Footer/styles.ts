import styled from 'styled-components'

export const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  height: 30rem;
  width: 100%;
  border: solid;
  left: 0;
  bottom: 0;
  align-items: flex-start;
  border-width: 1px 0 0 0;
  padding: 7rem 0 0 0;
  border-top-color: ${props => props.theme.grey};
  background-color: ${props => props.theme.primary_darker};
  #information-div {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    align-items: flex-start;
  }
  #logo-and-title-div {
    img {
      margin-top: -1.5rem;
      height: 14rem;
    }
    p {
      font-weight: 400;
      color: white;
      font-size: 3rem;
      text-shadow: -1px 0 black;
    }
  }
  @media (max-width: 798px) {
    grid-template-columns: 50% 50%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-right: 5%;
    padding-bottom: 5rem;
    #logo-and-name-div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    #information-div {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: 3rem;
      }
    }
    h2 {
      margin-top: 0.1rem;
    }
  }
  @media (min-width: 799px) and (max-width: 1150px) {
    grid-template-columns: 35% 65%;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-right: 5%;
    padding-bottom: 5rem;
    #logo-and-name-div {
      align-self: flex-start;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`
export const About = styled.div`
  color: white;
  a {
    text-decoration: none;
    color: inherit;
  }
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: normal;
  }
`
export const ContactUs = styled.div`
  color: white;
  a {
    text-decoration: none;
    color: inherit;
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 2.7rem;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    margin: 0.2rem;
    margin-bottom: 0.3rem;
  }
`
export const OurApp = styled.div`
  color: white;
  a {
    text-decoration: none;
    color: inherit;
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 2.7rem;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    margin: 0.2rem;
  }
`