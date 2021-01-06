import React from "react"
import { useSelector, useDispatch } from "react-redux"
import GoogleMapReact from "google-map-react";
import { RootState } from "../../store"
import redHeartPinIcon from "../../assets/images/redHeartPinIcon.png"
import { MapContainer, MapProfileImg } from "./styles"

export default function MapRegister() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petStore = reduxState.petReducer;
  const appStore = reduxState.appReducer;
  const dispatch = useDispatch();

  function setMarker(lat: number, lng: number) {
    dispatch({ type: "SET_LOCATION", payload: { coordinates: [lng, lat] } });
  }

  const Marker = (props: any) => {
    return (
      <MapProfileImg src={redHeartPinIcon} />
    )
  }

  return (
    <MapContainer id="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBy4KVsYVODK8UBi77QxMaEtFK037ImH1E" }}
        defaultCenter={{ lat: -23.5532003, lng: -46.6496674 }}
        defaultZoom={12}
        center={appStore.coords}
        zoom={appStore.mapZoom}
        onClick={({ lat, lng }) => setMarker(lat, lng)}
      >
        {petStore.location.coordinates[1] !== 0 &&
          <Marker
            lat={petStore.location.coordinates[1]}
            lng={petStore.location.coordinates[0]}
          />
        }
      </GoogleMapReact>
    </MapContainer>
  )
}
