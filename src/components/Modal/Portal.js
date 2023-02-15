import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
  let element = document.getElementById('portal');
  if (!element) return ;

  return createPortal(children, element)
}

export default Portal