import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const PageContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 46% 27%;
  padding: 2% 5% 2% 5%;
  background: ${props => props.theme.background_primary};
  &, div, button, p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
  .generic-text {
    height: 4rem;
    font-size: 1.8rem;
    margin: 0 0 2rem 1rem;
    color: ${props => props.theme.dark_grey};
  }
  #photos-map-column {
    padding: 0 5rem 0 5rem;
    margin-bottom: 5rem;
  }
  #radio-selection-column {
    height: 75.2rem;
    display: flex;
    flex-direction: column;
    padding: 0 0 0 2rem;
    margin-bottom: 5rem;
  }
  #radio-selection-container {
    margin-bottom: 4rem;
  }
  #standard-button {
    height: 7rem;
    width: 100%;
    box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow} !important;
    p {
      font-size: 2rem;
    }
  }
  #standard-button-div {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    justify-self: center;
    margin-top: auto;
  }
  #fake-column {
    display: none;
  }
  #loading-screen {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
  }
  @media (max-width: 600px) {
    grid-template-columns: 100%;
    justify-content: center;
    * {
      font-size: 105%;
    }
    .generic-text {
      font-size: 115%;
    }
    #photos-map-column {
      padding: 0;
      margin-top: 2rem;
    }
    #radio-selection-column {
      height: 100%;
    }
  }
  @media (min-width: 601px) and (max-width: 788px) {
    grid-template-columns: 80%;
    justify-content: center;
    #photos-map-column {
      padding: 0;
      margin-top: 2rem;
    }
    #radio-selection-column {
      height: 100%;
    }
  }
  @media (min-width: 789px) and (max-width: 1174px) {
    grid-template-columns: 45% 55%;
    #photos-map-column {
      padding: 0;
    }
    #standard-button-div {
      display: none;
    }
    #fake-column {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      justify-self: center;
      margin-top: auto;
      padding: 0 5% 0 5%;
      margin-bottom: 9rem;
    }
    #radio-selection-column {
      height: 100%;
    }
  }
`
export const FormColumn = styled.div`
  margin-bottom: 5rem;
  #dropdown-div {
    display: flex;
    width: 95%;
    margin: 0.6rem 0 0.6rem 0;
    flex-direction: column;
    div + div {
      margin-top: 1.2rem;
    }
    .search {
      height: 4.5rem;
      border-radius: 1rem;
      color: ${props => props.theme.black} !important;
      background: ${props => props.theme.white} !important;
      ::selection{
        color: white;
        background: ${props => props.theme.primary} !important;
      }
      ::-moz-selection{
        color: white;
        background: ${props => props.theme.primary} !important;
      }
    }
    div.visible.menu.transition {
      height: 40vh;
      max-height: 40vh;
      width: auto !important;
      background: ${props => props.theme.white};
    }
    .active.selected.item {
      display: flex !important;
      height: 4rem;
      background: ${props => props.theme.primary} !important;
      align-items: center !important;
      justify-content: flex-start !important;
      span {
        color: white !important;
        font-size: 1.8rem;
      }
    }
    div.item {
      margin: 0.7rem 0 0 0 !important;
      background: ${props => props.theme.white};
      &:hover {
        background: ${props => props.theme.grey} !important;
      }
    }
    span {
      font-size: 1.5rem;
      font-weight: bold;
      white-space: nowrap;
      color: ${props => props.theme.black};
    }
    div.ui.search.selection.dropdown {
      box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow} !important;
    }
    div.divider.text {
      margin-top: 2px !important;
    }
    div.divider.default.text {
      margin-top: 3px !important;
      font-size: 1.5rem;
      color: ${props => props.theme.input_text_grey};
    }
  }
  @media (max-width: 600px) {
    #dropdown-div {
      .search {
        height: 5.5rem;
      }
    }
  }
  @media (min-width: 601px) and (max-width: 788px) {
    #dropdown-div {
      .search {
        height: 5.5rem;
      }
    }
  }
`
export const ErrorMessage = styled.p`
  margin-left: 0.2rem;
  font-size: 1.7rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
`
export const LostOrFoundSelectionScreen = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.absolute_background};
  background-attachment: fixed;
  #lost-or-found-screen-internal-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 2rem;
    background: #f7f7f7;
  }
  button {
    margin: 0 1rem 0 1rem;
    height: 3rem;
    width: 11rem;
  }
  @media (max-width: 500px) {
    #lost-or-found-screen-internal-div {
      margin: 0 1rem 0 1rem;
    }
  }
`
export const LostAndFoundButton = styled.button`
  width: 11rem;
  cursor: pointer;
  outline: none;
  border-style: solid;
  border-radius: 0.5rem;
`