import React, { useContext, useRef, useState } from 'react'
import { ArrowButton, CloseModalBtn, FilesContainer, ModalContainer, SearchView, TabTitle } from '../styles/ModalStyles'
import ArrowLeft from '../../assets/svg/ArrowLeft'
import ArrowRight from '../../assets/svg/ArrowRight'
import Draggable from 'react-draggable'
import FileItem from '../Items/FileItem'
import Close from '../../assets/svg/Close'
import FileContext from '../../context/FilesContext'
import ContextMenu from './ContextMenu'

const ExplorerModal = ({ closeModal }) => {
  const { path, goBack, goFordward, fordwardRoute, searchFolder, deleteItem, files, loading } = useContext(FileContext)
  const [contextModal, setContextModal] = useState(false);
  const position = useRef({x: 0, y : 0});

  return (
    <Draggable handle='#modalExplorer'>
      <ModalContainer>
        <TabTitle id='modalExplorer'>
          <img style={{width: '1.25rem', background: 'white', borderRadius: '50%', padding: '0.125rem', marginRight: '0.25rem'}} src={require('../../assets/explorericon.png')} alt='explorericon' />
          <span style={{fontWeight: 'bold'}}>Explorador de archivos</span>
          <CloseModalBtn onClick={closeModal}><Close /></CloseModalBtn>
        </TabTitle>
        <div style={{display: 'flex', marginBottom: '0.625rem'}}>
          <ArrowButton onClick={goBack}><ArrowLeft /></ArrowButton>
          <ArrowButton onClick={goFordward} disabled={!fordwardRoute.current}><ArrowRight /></ArrowButton>
          <SearchView>/{path}</SearchView>
        </div>
        <FilesContainer>
          {files.length === 0 && !loading && <p style={{textAlign: 'center'}}>Esta carpeta está vacía</p>}
          {files.map((e) => <FileItem key={`${path}/${e}`} item={`${path}/${e}`} searchFolder={searchFolder} del={deleteItem} />)}
          <div style={{height: 'auto', flex: '1'}} onContextMenu={(e) => {
            position.current = {x: e.clientX, y: e.clientY}
            setContextModal(true);
          }}>
          </div>
        </FilesContainer>
        {contextModal && <ContextMenu onExplorer path={path} x={position.current.x} y={position.current.y} closeModal={() => setContextModal(false)} />}
      </ModalContainer>
    </Draggable>
  )
}

export default ExplorerModal