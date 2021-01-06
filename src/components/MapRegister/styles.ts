import styled from 'styled-components'
import '../../assets/styles/fonts.css'

export const MapContainer = styled.div`
  display: flex;
  height: 38.6rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 1px 2px 5px 0px ${props => props.theme.shadow};
  cursor: pointer;
  * {
    cursor: pointer;
  }
`
export const MapProfileImg = styled.img`
  height: 4rem;
  margin: -2.3rem 0 0 -1.1rem;
`
