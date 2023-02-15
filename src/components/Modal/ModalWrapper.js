import { useContext } from 'react'
import ModalContext from '../../context/ModalContext'
import Portal from './Portal';
import TextFileModal from './TextFileModal';

const ModalWrapper = () => {
  const { modals, removeModal } = useContext(ModalContext);

  return <Portal>
    {modals.map((e) => <TextFileModal key={e.path} path={e.path} type={e.type} closeModal={() => removeModal(e)} />)}
  </Portal>;
}

export default ModalWrapper