import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const Container = styled.div`
  display: grid;
  margin: -0.35rem 0 0 1rem;
  width: 100%;
  #colors {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`
export const AnimalAngGenderDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const TitleText = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 2rem 0 2rem 0;
  color: ${props => props.theme.black};
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
  margin: 0;
  color: ${props => props.theme.dark_grey};
`
