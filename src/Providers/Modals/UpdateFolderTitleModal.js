import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from '../ModalProvider';
import { PlaygroundContext } from '../PlaygroundProvider';

const UpdateFolderTitleModal = () => {
  const {closeModal, modalPayload} = useContext(ModalContext);
  const {editFolderTitle} = useContext(PlaygroundContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value ;
    editFolderTitle(folderName, modalPayload );
    closeModal();
  }
  return (
    <>
    <div className="modal-container fixed w-full h-screen bg-zinc-900/50 flex items-center justify-center ">
        <form onSubmit={onSubmitModal}  className="modal-body select-none w-[35vw] h-[10vw] bg-white rounded-lg p-[1.5vw]">
          <div className="flex justify-between items-center ">
            <h1 className="font-bold text-[2vw] leading-none ">Edit Folder Title</h1>
            <span>
              <IoCloseSharp onClick={closeModal} className="text-[2.5vw] -mt-[.5vw] text-zinc-900 hover:scale-90 transition-all duration-500 " />
            </span>
          </div>
          <div className="flex items-center justify-between mt-[1vw]">
            <input required name="folderName" type="text" className="w-[18vw] h-[2.8vw] border-[1px] border-zinc-900 m-[.7vw] px-[1vw] py-[.5vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500" />
            <button className="flex justify-center items-center w-[11vw] h-[3vw] bg-zinc-900 text-white px-[2vw] py-[.8vw] mr-[.7vw] rounded-xl hover:scale-90 transition-all duration-500  "><span className=" text-[1.1vw]">Update Title</span></button>
          </div>
        </form>
      </div>
    
    </>
  )
}

export default UpdateFolderTitleModal