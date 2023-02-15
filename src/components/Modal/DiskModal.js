import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import Close from '../../assets/svg/Close'
import { CloseModalBtn, ModalContainer, TabTitle } from '../styles/ModalStyles'
import Portal from './Portal'

const DiskModal = ({ closeModal }) => {
  const [constants, setConstants] = useState({})
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/disk`)
      .then(res => setConstants(res.data.data))
      .catch(() => alert('cannot get constants'))
  }, [])

  console.log(constants)

  return (
    <Portal>
      <Draggable handle='#disk_handle'>
        <ModalContainer>
          <TabTitle id='disk_handle'>
            <img style={{width: '1.25rem', background: 'white', borderRadius: '50%', padding: '0.125rem', marginRight: '0.25rem'}} src={require('../../assets/diskicon.png')} alt='diskicon' />
            <span>Información del sistema</span>
            <CloseModalBtn onClick={closeModal}><Close /></CloseModalBtn>
          </TabTitle>
          <div style={{width: '25rem', minHeight: '6.25rem', display: 'flex', flexDirection: 'column', marginBottom: '2.5rem'}}>
            <div>
              <b>Máximo tamaño de disco: </b>
              <p>{constants.MAX_DISK_SIZE} bytes.</p>
            </div>
            <div>
              <b>Tamaño de bloque: </b>
              <p>{constants.BLOCK_SIZE} bytes.</p>
            </div>
            <div>
              <b>Máximo tamaño de nombre de archivo: </b>
              <p>{constants.MAX_FILENAME_LENGTH}</p>
            </div>
            <div>
              <b>Máximo tamaño de folder: </b>
              <p>{constants.MAX_FOLDER_SIZE} bytes</p>
            </div>
            <div>
              <b>Máximo número de archivos en folder: </b>
              <p>{constants.MAX_NUM_FILES_IN_FOLDER} archivos y carpetas.</p>
            </div>
            <div>
              <b>Máximo tamaño de archivo: </b>
              <p>{constants.MAX_FILE_SIZE} bytes</p>
            </div>
            <div>
              <b>Máximo tamaño de archivos en raiz: </b>
              <p>{constants.MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT} archivos.</p>
            </div>
          </div>
        </ModalContainer>
      </Draggable>
    </Portal>
  )
}

export default DiskModal