import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

const CreatePlaygroundModal = () => {
  const modalFeatures = useContext(ModalContext);
  const PlaygroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;
    PlaygroundFeatures.createNewPlayground({
      folderName,
      fileName,
      language,
    });
    closeModal();
  };

  return (
    <>
      <div className="modal-container flex items-center justify-center fixed w-full h-screen bg-zinc-900/50 ">
        <form
          onSubmit={onSubmitModal}
          className="modal-body select-none w-[36vw] h-[21vw] bg-white rounded-lg p-[1.5vw] "
        >
          <div className="item flex justify-between mb-[1.5vw]  ">
            <h1 className="font-bold text-[2.2vw] leading-none ">
              Create New Playground & New Folder
            </h1>
            <span>
              <IoCloseSharp
                onClick={closeModal}
                className="text-[3vw] -mt-[.5vw] cursor-pointer text-zinc-900 hover:scale-90 transition-all duration-500 "
              />
            </span>
          </div>
          <div className="item flex justify-between items-center ">
            <p className="text-[1.2vw] font-semibold">Enter Folder Name</p>
            <input required
              name="folderName"
              className="w-[15vw] h-[3vw] cursor-pointer border-[1px] border-zinc-900 m-[.7vw] px-[1vw] py-[.5vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500 "
            />
          </div>
          <div className="item flex justify-between items-center">
            <p className="text-[1.2vw] font-semibold">Enter Card Name</p>
            <input required
              name="fileName"
              className="w-[15vw] h-[3vw] cursor-pointer border-[1px] border-zinc-900 m-[.7vw] px-[1vw] py-[.5vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="item flex justify-between mt-[1vw] ">
            <select required
              name="language"
              className="w-[8.5vw] h-[3vw] cursor-pointer border-[1px] border-zinc-900 px-[1vw] py-[.7vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500 "
            >
              <option value="cpp">CPP</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
            </select>
            <button
              type="submit"
              className="flex items-center cursor-pointer w-[15vw] h-[3vw] bg-zinc-900 text-white px-[2vw] py-[.8vw] mr-[.7vw] rounded-xl hover:scale-90 transition-all duration-500 "
            >
              <span className=" text-[1.3vw]">Create Playground</span>{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePlaygroundModal;
