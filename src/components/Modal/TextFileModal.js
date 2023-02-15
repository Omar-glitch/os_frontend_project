import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import { CloseModalBtn, ModalBtn, ModalContainer, TabTitle, TextContentArea } from '../styles/ModalStyles';
import textImage from '../../assets/textFile.png'
import Close from '../../assets/svg/Close';
import FileContext from '../../context/FilesContext';

const TextFileModal = ({ path, type, closeModal }) => {
  const [content, setContent] = useState('');
  const {reload} = useContext(FileContext);
  const formRef = useRef(null);

  useEffect(() => {
    if (type.includes('Editar'))
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/file/?path=${path}`)
        .then(res => setContent(res.data.data))
        .catch(console.log)
  }, [path, type])

  const sendContent = () => {
    const data = new FormData(formRef.current);
    const formdata = new URLSearchParams(data);
    let method = type.split(' ')[0];
    let copy = type.includes('Copiar') ? 'copy' : '';
    let f = path.includes('.txt') ? 'file' : 'folder';
    if (type.includes('Crear'))
      f = type.includes('texto') ? 'file' : 'folder'

    axios({method, data: formdata, url: `${process.env.REACT_APP_BACKEND_URL}/${f}/${copy}`})
      .then(() => reload(path))
      .catch(e => alert(e.response.data.error))
  }

  return (
    <Draggable handle={`#${'que'}`} >
      <ModalContainer>
        <form ref={formRef}>
          <TabTitle bg='gray' id={'que'}>
            <img style={{width: '1.25rem', background: 'white', borderRadius: '50%', padding: '0.125rem', marginRight: '0.25rem'}} src={textImage} alt='icon' />
            {path.split('/').pop()}
            <CloseModalBtn onClick={closeModal}>
              <Close />
            </CloseModalBtn>
          </TabTitle>
          <input style={{width: '100%', marginBottom: '0.5rem'}} placeholder='lugar antiguo' type='hidden' name='oldPath' defaultValue={path} />
          <input style={{width: '100%', marginBottom: '0.5rem'}} placeholder='Ingresa nombre' type={type.includes('Crear') ? 'text' : 'hidden'} name='path' defaultValue={type.includes('Crear') ? '' : path} />
          {type.includes('Renombrar') && <input style={{width: '100%', marginBottom: '0.5rem'}} placeholder='Ingrese nuevo valor' type='text' name='newPath' />}
          {type.includes('content') && <TextContentArea name='content' defaultValue={content}></TextContentArea>}
          <ModalBtn onClick={sendContent}>Guardar</ModalBtn>
        </form>
      </ModalContainer>
    </Draggable>
  )
}

export default TextFileModal