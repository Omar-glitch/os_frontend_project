import React, { useContext, useEffect, useRef } from 'react'
import ModalContext from '../../context/ModalContext';
import { ContextContainer } from '../styles/ModalStyles';
import Portal from './Portal';
import ModalTypes from '../../constants/ModalTypes';
import FileContext from '../../context/FilesContext';

const ContextMenu = ({ x, y, path, closeModal, onExplorer }) => {
  const list = useRef(null);
  const { addModal } = useContext(ModalContext);
  const { deleteItem } = useContext(FileContext);

  useEffect(() => {
    const click = (e) => {
      if (list.current === null) return;
      if (!list.current.contains(e.target)) {
        closeModal()
      }
    }

    window.addEventListener('click', click, true);
    window.addEventListener('contextmenu', click, true);
  
    return () => {
      window.removeEventListener('click', click, true)
      window.removeEventListener('contextmenu', click, true)
    }
  }, [closeModal])

  const copy = (e) => {
    e.stopPropagation();
    addModal({ path, type: ModalTypes.COPY })
    closeModal()
  }

  const rename = (e) => {
    e.stopPropagation();
    addModal({ path, type: ModalTypes.RENAME_FOLDER })
    closeModal();
  }

  const createText = (e) => {
    e.stopPropagation();
    addModal({ path, type: ModalTypes.CREATE_TEXT_FILE })
    closeModal();
  }
  
  const createFolder = (e) => {
    e.stopPropagation();
    addModal({ path, type: ModalTypes.CREATE_FOLDER })
    closeModal();
  }

  return (
    <Portal>
      <ContextContainer ref={list} t={y} l={x}>
        {onExplorer ?  <>
          <span onClick={createFolder}>Crear folder</span>
          <span onClick={createText}>Crear texto</span>
        </>
          : <>
          <span onClick={copy}>Copiar</span>
          <span onClick={rename}>Cortar</span>
          <span onClick={rename}>Renombrar</span>
          <span onClick={(e) => {e.stopPropagation(); deleteItem(path)}}>Eliminar</span>
          </>
        }
      </ContextContainer>
    </Portal>
  )
}

export default ContextMenu