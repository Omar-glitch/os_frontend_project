import React, { useContext, useRef, useState } from 'react'
import { FolderFile } from '../styles/ModalStyles';
import textImage from '../../assets/textFile.png'
import folderImage from '../../assets/folder.png'
import ContextMenu from '../Modal/ContextMenu';
import ModalContext from '../../context/ModalContext';
import ModalTypes from '../../constants/ModalTypes';
import FileContext from '../../context/FilesContext';

const FileItem = ({ item }) => {
  const { addModal } = useContext(ModalContext)
  const { searchFolder } = useContext(FileContext)
  const [contextModal, setContextModal] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  let isTextFile = item.includes('.txt');
  const filename = item.split('/').pop();
  
  return (
    <FolderFile 
      onClick={() => isTextFile ? addModal({ path: item, type: ModalTypes.CONTENT_FILE }) : searchFolder(filename)}
      onContextMenu={(e) => {
        position.current = {x: e.clientX, y: e.clientY}
        setContextModal(true);
      }}
    >
      <img src={isTextFile ? textImage : folderImage} alt='a' />
      <p>{filename}</p>
      {contextModal && <ContextMenu path={item} x={position.current.x} y={position.current.y} closeModal={() => setContextModal(false)} />}
    </FolderFile>
  )
}

export default FileItem