import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const PhotosContainer = styled.div`
  height: 21.5rem;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  justify-content: space-between;
  margin: 0 0 3rem 0;
  &, * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
`
export const PhotoDiv = styled.div`
  height: 21.5rem;
  position: relative;
  outline: none;
  border-radius: 1rem;
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
`
export const GreyImageDiv = styled(PhotoDiv)`
  cursor: cell;
`
export const PhotoImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
`
export const AddDeleteButton = styled.button`
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: -0.7rem;
  bottom: -0.7rem;
  outline: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
`
export const AddDeleteImg = styled.img`
  height: 100%;
`
