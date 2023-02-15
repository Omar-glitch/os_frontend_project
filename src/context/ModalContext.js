import React, { createContext, useCallback, useState } from "react";

const ModalContext = createContext();

export const ModalReducer = ({ children }) => {
  const [modals, setModals] = useState([])

  const addModal = useCallback((modal) => {
    setModals(prev => {
      let exists = prev.find((e) => e.path === modal.path);
      if (!exists)
        return [...prev, modal]
      return prev;
    })
  }, [])

  const removeModal = useCallback((modal) => {
    setModals(prev => prev.filter(e => e.path !== modal.path));
  }, [])

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext