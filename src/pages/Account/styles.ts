import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  &, * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    :focus {outline:none !important;}
  }
  @media (max-width: 560px) {
    height: 100%;
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    #lateral-panel {
      /* height: 30rem; */
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      border-width: 0;
      .empty-div {
        display: none;
      }
      .panel-buttons {
        justify-content: center;
        border-width: 0 0 1px 0;
      }
      .left-buttons {
        border-width: 0 0 1px 1px;
      }
    }
    #results {
      padding: 1rem 0 0 0;
    }
  }
`
export const LateralPanel = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: repeat(7, 9%);
  border-right-width: 1px;
  border-right-color: ${props => props.theme.grey};
  border-right-style: solid;
  background: ${props => props.theme.white};
  button + button {
    border-top: 0;
  }
`
export const Icons = styled.img`
  height: 2rem;
  margin: 0 1.5rem 0 0.5rem;
`
export const PanelButtons = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  outline: none;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${props => props.theme.grey};
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 1.2rem 1rem 1.2rem ;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  &:hover {
    background: ${props => props.theme.background_hover_buttons};
  }
`
export const Results = styled.div`
  width: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
  position: relative;
  padding: 4rem 4rem 4rem 5rem;
  background: ${props => props.theme.background_primary};
  @media (max-width: 530px) {
    display: flex;
    overflow-y: auto;
    align-items: center;
    flex-direction: column;
  }
  @media (max-width: 559px) {
    display: flex;
    overflow-y: auto;
    justify-content: center;
    flex-direction: row;
  }
`
export const EmptyScreen = styled.div`
  min-height: 95.8vh;
  background: ${props => props.theme.background_primary};
`
export const PetsImageDiv = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70%;
    min-width: 28rem;
    max-width: 60rem;
  }
`
