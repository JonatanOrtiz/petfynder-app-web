import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import deleteIcon from '../../assets/images/deleteIcon.png'
import { RootState } from "../../store"
import Dropzone from 'react-dropzone'
import { PhotosContainer, PhotoDiv, GreyImageDiv, PhotoImg, AddDeleteImg, AddDeleteButton } from './styles';

const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImageSite.png'

export default function Photos() {
  const reduxState = useSelector((reduxState: RootState) => reduxState);
  const petImages = reduxState.petReducer.photos;
  const dispatch = useDispatch();

  function pickPhotos(acceptedFiles: any[], index: number) {
    let newImagesArray =
    [...petImages.slice(0, index)].concat([...acceptedFiles.slice(0, 3 - index)], [...petImages.slice(index + acceptedFiles.length, 3)])
    dispatch({ type: 'SET_PHOTOS', payload: newImagesArray })
  }

  function deletePhoto(index: number) {
    let newImagesArray = [...petImages.slice(0, index), greyImage, ...petImages.slice(index + 1, 6)]
    dispatch({ type: 'SET_PHOTOS', payload: newImagesArray })
  }

  return (
    <>
      <PhotosContainer>
        {petImages.map((photo: string, index: number) => (
          <Dropzone
            key={index}
            accept="image/*"
            onDropAccepted={(acceptedFiles) => pickPhotos(acceptedFiles, index)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                {photo === greyImage ?
                  <GreyImageDiv {...getRootProps()}>
                    <input {...getInputProps()} />
                    <PhotoImg src={photo} />
                  </GreyImageDiv>
                  :
                  <PhotoDiv >
                    <input {...getInputProps()} />
                    <PhotoImg src={typeof(photo) === "string" ? photo : URL.createObjectURL(photo)} />
                    <AddDeleteButton onClick={() => deletePhoto(index)}>
                      <AddDeleteImg src={deleteIcon} />
                    </AddDeleteButton>
                  </PhotoDiv>
                }
              </section>
            )}
          </Dropzone>
        ))}
      </PhotosContainer>
    </>
  );
}
