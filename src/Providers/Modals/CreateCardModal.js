import React, { useContext } from "react";
import { ModalContext } from '../ModalProvider';
import { IoCloseSharp } from "react-icons/io5";
import { v4 } from "uuid";
import { PlaygroundContext, defaultCode } from "../PlaygroundProvider";

const CreateCardModal = () => {

    const {closeModal, modalPayload} = useContext(ModalContext);
    const {createPlayground} = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;

        const file = {
            id: v4(),
            title: fileName,
            language,
            code: defaultCode[language]
        }

        createPlayground(modalPayload, file);
        closeModal();

    };


  return (
    <>
      <div className="modal-container fixed w-full h-screen bg-zinc-900/50 flex items-center justify-center ">
        <form
          onSubmit={onSubmitModal}
          className="modal-body select-none w-[35vw] h-[15vw] bg-white rounded-lg p-[1.5vw]"
        >
          <div className="flex justify-between items-center mb-[2vw] ">
            <h1 className="font-bold text-[2vw] leading-none ">
              Create New Playground
            </h1>
            <span>
              <IoCloseSharp
                onClick={closeModal}
                className="text-[2.5vw] -mt-[.5vw] text-zinc-900 hover:scale-90 transition-all duration-500 "
              />
            </span>
          </div>
          <div className="flex items-center justify-between mb-[1vw]">
            <input
              required
              name="fileName"
              type="text"
              className="w-[20vw] h-[3vw] border-[1px] border-zinc-900 m-[.7vw] px-[1vw] py-[.5vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500"
            />

            <select
              required
              name="language"
              className="w-[8vw] h-[3vw] cursor-pointer border-[1px] border-zinc-900 px-[1vw] py-[.7vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500 "
            >
              <option value="cpp">CPP</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
            </select>
          </div>
          <button className="flex justify-center items-center m-[.7vw] w-[20vw] h-[3vw] bg-zinc-900 text-white px-[2vw] py-[.8vw] mr-[.7vw] rounded-lg hover:scale-90 transition-all duration-500  ">
            <span className=" text-[1.2vw]">Create Playground</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCardModal;
