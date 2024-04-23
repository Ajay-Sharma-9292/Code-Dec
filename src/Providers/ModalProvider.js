import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

export const modalConstants = {
  CREATE_PLAYGROUND: 'CREATE_PLAYGROUND',
  CREATE_FOLDER: 'CREATE_FOLDER',
  UPDATE_FOLDER_TITLE: 'UPDATE_FOLDER_TITLE',
  UPDATE_FILE_TITLE: 'UPDATE_FILE_TITLE',
  CREATE_CARD: 'CREATE_CARD'
  
}

const ModalProvider = ({children}) => {
    const [modalType, setmodalType] = useState(null);
    const [modalPayload, setmodalPayload] = useState(null);

    const closeModal = () =>{
        setmodalType(null);
        setmodalPayload(null);
    };

    const modalFeatures = {
        openModal : setmodalType,
        closeModal,
        activeModal : modalType,
        modalPayload,
        setmodalPayload
    }
   
  return (
    <ModalContext.Provider value={modalFeatures}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider