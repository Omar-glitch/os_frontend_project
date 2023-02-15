import { useEffect, useState } from 'react';
import ExplorerModal from './components/Modal/ExplorerModal';
import { Icon } from './components/styles/Icon';
import './global.css'
import { ModalReducer } from './context/ModalContext';
import ModalWrapper from './components/Modal/ModalWrapper';
import { FileReducer } from './context/FilesContext';
import DiskModal from './components/Modal/DiskModal';

function App() {
  const [explorerModal, setExplorerModal] = useState(false);
  const [diskModal, setDiskModal] = useState(false);

  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, [])

  return (
    <FileReducer>
      <ModalReducer>
        <div>
          <img src={require('./assets/os_background.jpg')} style={{width:'100%', height: '100vh', objectFit: 'cover'}} alt='background' />
          <Icon top='0' left='0'>
            <img src={require('./assets/trashicon.png')} alt='papelera' />
          </Icon>
          <Icon top='4.375rem' l='0' onClick={() => setExplorerModal(!explorerModal)}>
            <img src={require('./assets/explorericon.png')} alt='explorer' />
          </Icon>
          <Icon top='8.75rem' l='0' onClick={() => setDiskModal(!diskModal)}>
            <img src={require('./assets/diskicon.png')} alt='disk'  />
          </Icon>
          <ModalWrapper />

          { explorerModal && <ExplorerModal closeModal={() => setExplorerModal(false)} />}
          { diskModal && <DiskModal closeModal={() => setDiskModal(false)} />}
        </div>
      </ModalReducer>
    </FileReducer>
  )
}

export default App;
