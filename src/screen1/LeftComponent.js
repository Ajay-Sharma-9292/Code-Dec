import React, { useContext } from 'react'
import { ImPlus } from "react-icons/im";
import { ModalContext, modalConstants } from "../Providers/ModalProvider";


const LeftComponent = () => {
  
  const modalFeatures = useContext(ModalContext);

  const openCreatePlaygroundModal = () =>{
    modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND)
  }
  return (
    <>
    <div className="left-container select-none relative bg-zinc-900 w-2/5 h-screen text-white  ">
          <div className="center-div absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center ">
            <img
              className="w-[10vw] h-[10vw] "
              src="https://code-deck.vercel.app/static/media/logo.cba940861dd8aabf4a90.png"
              alt=""
            />
            <h1 className=" text-[3vw] font-thin">
              <span className="font-bold">Code</span>&nbsp;Dec{" "}
            </h1>
            <div className=" text-[1.9vw] text-zinc-400">
              Code. Compile. Debug.
            </div>
            <button onClick={openCreatePlaygroundModal} className="hover:scale-90 transition-all duration-500 shadow-lg  shadow-zinc-500 flex gap-[.5vw] items-center  bg-zinc-300 text-black px-[2vw] py-[.8vw] rounded-[3vw] mt-[2vw]">
              <ImPlus className='text-[1.3vw]' />
             <span className='text-[1.3vw]'>Create New Playground</span> 
            </button>
          </div>
        </div>
    </>
  )
}

export default LeftComponent