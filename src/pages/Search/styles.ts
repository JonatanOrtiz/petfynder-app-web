import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
  padding: 0 5% 0 5%;
  align-items: center;
  justify-content: center;
  border: 0;
  border-style: solid;
  border-color: ${props => props.theme.grey};
  border-bottom-width: 1px;
  background: ${props => props.theme.white};
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
  @media(max-width: 559px) {
    height: 14rem;
    flex-direction: column;
    padding: 0 1.5% 0 1.5%;
    transition: ease all 0.3s;
    > * {
    transition: ease all 0.1s;
    }
    > .search-bar-child {
      height: 40%;
      margin: 0.4rem;
    }
    div + button {
      white-space: nowrap;
      width: 45%;
      align-self: flex-start;
      padding: 0;
      * {
        margin: 0;
        padding: 0;
      }
      p {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
    }
  }
  @media(min-width: 560px) {
    transition: ease all 0.3s;
    > * {
    transition: ease all 0.1s;
    }
    height: 8rem;
    > .search-bar-child {
      height: 60%;
    }
    div + button {
      p {
        font-size: 1.35rem;
        transition: 0s;
      }
    }
  }
`

export const SearchInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: stretch;
  border: 0;
  border-radius: 1rem 3rem 3rem 1rem;  
  background: ${props => props.theme.white};
  form {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`
export const LostOrFoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 100%;
  outline: none;
  cursor: pointer;
  padding: 0 1rem 0 1rem;
  border-width: 2px;
  border-right: 0;
  border-style: solid;
  border-radius: 1rem 0 0 1rem;
  border-color: ${props => props.theme.primary};
  background: ${props => props.theme.primary};
`
export const LostOrFoundButtonText = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
`
export const DownArrowIcon = styled.img`
  height: 25%;
  margin: 0 0 0 0.5rem;
`
export const LostOrFoundDropDownDiv = styled.div`
  top: 8rem;
  left: 8rem;
  outline: none;
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 1rem;
  background: ${props => props.theme.white};
`
export const LostOrFoundDropDownButton = styled.button`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  outline: none;
  border: 0;
  border-radius: 1rem;
  cursor: pointer;
  padding: 0.8rem;
  background: ${props => props.theme.white};
  &:hover {
    background: ${props => props.theme.primary};
    p {
      color: white;
    }
  }
`
export const LostOrFoundDropDownButtonText = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${props => props.theme.dark_grey};
`
export const SearchInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${props => props.theme.black};
  outline: none;
  padding-left: 1rem;
  border-width: 2px;
  border-right: 0;
  border-style: solid;
  border-color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
`
export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 0 3rem 3rem 0;
  cursor: pointer;
  border-width: 2px;
  border-left: 0;
  border-style: solid;
  border-color: ${props => props.theme.primary};
  padding: 0 1rem 0 1rem;
  background: ${props => props.theme.white};
`
export const SearchIcon = styled.img`
  height: 60%;
`
export const MapButton = styled.button`
  display: flex;
  margin-left: 2rem;
  padding: 0 1.5rem 0 0.5rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 1rem;
  border-style: solid;
  outline: none;
  cursor: pointer;
  border-color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  &:hover {
    background: ${props => props.theme.primary};
    p {
      color: white;
    }
  }
  @media(max-width: 560px) {
    display: none;
  }
  @media(min-width: 560px) {
    display: flex;
  }
`
export const MapButtonLarge = styled.button`
  display: flex;
  height: 100%;
  white-space: nowrap;
  width: 49%;
  padding: 0 6% 0 6%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border-radius: 1rem;
  border-style: solid;
  outline: none;
  cursor: pointer;
  border-color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  p {
    font-size: 1.8rem;
  }
`
export const MapButtonText = styled.p`
  display: flex;
  margin: 0;
  font-weight: bold;
  font-size: 5rem;
  color: ${props => props.theme.primary};
`
export const MapIcon = styled.img`
  display: flex;
  margin: 0.1rem 0 0 -0.4rem;
  height: 75%;
  @media(max-width: 560px) {
    height: 60%;
    margin: 0 0 0 0.5rem;
  }
`
export const MapAndFilterButtonsDiv = styled.div`
  height: 40%;
  width: 100%;
  padding: 0 0.4rem 0 0.4rem;
  margin-top: 1%;
  align-items: center;
  justify-content: space-between;
  @media(max-width: 560px) {
    display: flex;
  }
  @media(min-width: 560px) {
    display: none;
  }
`
export const FilterButton = styled.button`
  display: flex;
  height: 100%;
  white-space: nowrap;
  width: 49%;
  padding: 0 10% 0 10%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border-radius: 1rem;
  border-style: solid;
  outline: none;
  cursor: pointer;
  border-color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  p {
    font-size: 1.8rem;
  }
`
export const FilterButtonText = styled.p`
  display: flex;
  margin: 0;
  font-weight: bold;
  font-size: 5rem;
  color: ${props => props.theme.primary};
`
export const FilterIcon = styled.img`
  height: 60%;
  @media(max-width: 560px) {
    height: 50%;
    margin: 0 0 0 0.5rem;
  }
`
export const SearchContainer = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: row;
  padding: 2% 5% 3% 5%;
  background: ${props => props.theme.background_primary};
  @media(max-width: 559px) {
    flex-direction: column;
    padding: 2% 2% 3% 2%;
  }
`
export const FilterLateralDiv = styled.div`
  height: 100%;
  width: 35rem;
  align-items: center;
  justify-content: center;
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
  .search {
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
    width: 115% !important;
    min-width: 115% !important;
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
  #dropdown-div {
    div + div {
      margin: 1.5rem 0 0 0;
    }
  }
  .ui.search.selection.dropdown {
    margin: 0.5rem 0 0 0;
    box-shadow: 1px 1px 5px 0px ${props => props.theme.shadow} !important;
  }
  div.divider.text {
    margin-top: 2px !important;
  }
  div.divider.default.text {
    margin-top: 3px !important;
    font-size: 1.5rem;
    color: ${props => props.theme.input_text_grey} !important;
  }
  #colors, #gender {
    margin-top: 2rem;
  }
  @media(max-width: 559px) {
    width: 100%;
    padding: 0 0 2rem 1.1rem;
    background: ${props => props.theme.background_primary};
    * {
      font-size: 104%;
    }
    .titles {
      margin-bottom: 1rem;
      font-size: 2rem;
    }
    #dropdown-div {
      margin: 1rem 0 0 -1rem;
      justify-content: space-between;
      div + div {
        margin: 2.5rem 0 0 0;
      }
    }
    .date-button {
      font-size: 70%;
      margin-left: 1rem;
    }
    .ui.search.selection.dropdown {
      margin: 2.5rem 1rem 0 0;
    }
    div.visible.menu.transition {
      height: 50vh;
      width: 100% !important;
      min-width: 100% !important;
      max-height: 50vh;
      overflow-x: scroll;
    }
    .active.selected.item {
      width: 115% !important;
      min-width: 115% !important;
    }
    div.item {
      margin: 0.5rem !important;
      width: 115% !important;
      min-width: 115% !important;
    }
    span {
      font-size: 1.8rem;
    }
    #title-options-div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 5rem;
    }
    #publication-date {
      margin-top: 2rem;
    }
    #colors-selection-container {
      margin-left: 1rem;
    }
  }
`
export const PublicationDateDiv = styled.div`
  margin: 3rem 0 3rem 0;
  div + div {
    margin-top: 1rem;
  }
  .react-datepicker__month-container {
    width: 22rem;
    * {
      font-size: 1.5rem;
    }
    .react-datepicker__day, .react-datepicker__day-name{
      margin: 0.6rem;
    }
  }
`
export const TitleText = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2rem 0 2rem 0;
  color: ${props => props.theme.black};
`
export const PickDateButton = styled.button`
  display: flex;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.theme.dark_grey};
  padding: 0.5rem 1rem 0.5rem 1rem;
  box-shadow: 1px 1px 4px 0px ${props => props.theme.shadow};
  background: ${props => props.theme.white};
  font-size: 1.5rem;
`
export const FromToDateDiv = styled.div`
  display: flex;
  width: 16rem;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.dark_grey};
`
export const FromToDateText = styled.p`
  width: 3rem;
  margin: 0 1rem 0 0;
`
export const RadioSelectionDiv = styled.div`
  button {
    margin: 0.5rem 0 0 0;
  }
`
export const RadioButton = styled.button`
  display: flex;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 0;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  background: transparent;
`
const RadioBorder = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 5px;
  border-width: 2px;
  border-radius: 12px;
  border-style: solid;
`
export const BorderSelected = styled(RadioBorder)`
  border-color: ${props => props.theme.green};
`
export const BorderUnselected = styled(RadioBorder)`
  border-color: ${props => props.theme.medium_grey};
`
const RadioCenter = styled.div`
  width: 8px;
  height: 8px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 10px;
`
export const CenterSelected = styled(RadioCenter)`
  background: ${props => props.theme.green};
`
export const CenterUnselected = styled(RadioCenter)`
  background: ${props => props.theme.medium_grey};
`
export const RadioText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  color: ${props => props.theme.dark_grey};
`
export const ResultsDiv = styled.div`
  display: flex;
  width: 100%;
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
  .infinite-scroll-component {
    display: flex;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: transparent;
  }
  #nothing-found-div {
    display: flex;
    height: 100%;
    width: 100%;
    font-weight: bold;
    font-size: 2rem;
    color: #6303a3;
    flex-direction: column;
    padding-top: 15rem;
    align-items: center;
    justify-content: flex-start;
    p {
      margin: 0;
    }
  }
`
export const MapContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  margin: 0.6rem 0 0 2rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  @media (max-width: 559px) {
    margin: 0;
  }
`
export const MapMarkerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const MapPetButton = styled.button`
  height: 12rem;
  width: 12rem;
  outline: none;
  border: 0;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  background: ${props => props.theme.primary};
`
export const MapProfileImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`
export const MapArrow = styled.div`
  background: transparent;
  border-color: transparent;
  border-top-color: ${props => props.theme.primary};
  border-style: solid;
  border-width: 1rem;
  align-self: center;
  margin-top: -1px;
`
export const NothingFoundImage = styled.img`
  width: 45%;
  margin-bottom: 2rem;
  @media(max-width: 1150px) {
    width: 65%;
  }
`
