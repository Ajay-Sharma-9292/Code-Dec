import React, { useContext } from "react";
import { ImPlus } from "react-icons/im";
import { FaFolderOpen } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlaygroundContext } from "../Providers/PlaygroundProvider";
import { ModalContext, modalConstants } from "../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(PlaygroundContext);
  const { openModal, setmodalPayload } = useContext(ModalContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    deleteFolder(folderId);
  };

  const onEditFolderTitle = () => {
    setmodalPayload(folderId);
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };

  const openCreateCardModal = () => {
    setmodalPayload(folderId);
    openModal(modalConstants.CREATE_CARD);
  };

  return (
    <div className="folder-container">
      <div className="folder-header flex justify-between mt-[2vw] py-[1vw] border-b-[1px] border-zinc-700 ">
        <div className="folder-header-items flex gap-[.5vw] items-center ">
          <FaFolderOpen className=" text-[1.8vw] text-yellow-500 " />
          <span className="text-[2vw] ">{folderTitle}</span>
        </div>
        <div className="flex gap-[.7vw] items-center cursor-pointer ">
          <RiDeleteBinLine
            onClick={onDeleteFolder}
            className="text-[1.8vw] hover:scale-90 shadow-xl shadow-inner hover:shadow-zinc-700 transition-all duration-500"
          />
          <BiEditAlt
            onClick={onEditFolderTitle}
            className="text-[1.8vw] hover:scale-90 shadow-xl shadow-inner hover:shadow-zinc-700 transition-all duration-500"
          />
          <div
            onClick={openCreateCardModal}
            className="flex items-center gap-[.5vw] hover:scale-90 shadow-xl shadow-inner hover:shadow-zinc-700 transition-all duration-500 "
          >
            <ImPlus className="text-[1.3vw] " />
            <h1 className="text-[1.2vw] ">New Playground</h1>
          </div>
        </div>
      </div>
      <div className="cards-container flex flex-wrap justify-between cursor-pointer">
        {cards?.map((file, index) => {
          const onEditFile = () => {
            setmodalPayload({ fileId: file.id, folderId: folderId });
            openModal(modalConstants.UPDATE_FILE_TITLE);
          };

          const onDeleteFile = () => {
            deleteFile(folderId, file.id);
          };

          const navigateToPlaygroundScreen = () => {
            //navigate to playground screen by using fileId and folderId
            navigate(`/Playground/${file.id}/${folderId}`);
          };

          return (
            <div className="card hover:scale-105 transition-all duration-500  shadow-xl hover:shadow-zinc-700 flex items-center justify-between mt-[2vw] px-[1vw] rounded-xl border-[1px] border-zinc-700 w-[25vw] ">
              <div
                key={index}
                onClick={navigateToPlaygroundScreen}
                className="card-item flex items-center gap-[2vw] "
              >
                <img
                  className="w-[5vw] h-[5vw] "
                  src="https://code-deck.vercel.app/static/media/logo.cba940861dd8aabf4a90.png"
                  alt=""
                />
                <div className="card-description flex flex-col ">
                  <span className="text-[1vw]">{file?.title}</span>
                  <span className="text-[1vw] ">
                    Language: {file?.language}
                  </span>
                </div>
              </div>
              <div className="card-icons flex gap-[.6vw] ">
                <RiDeleteBinLine
                  onClick={onDeleteFile}
                  className="text-[1.3vw] "
                />
                <BiEditAlt onClick={onEditFile} className="text-[1.3vw] " />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RightComponent = () => {
  const { folders } = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <>
      <div className="right-container overflow-y-scroll select-none bg-zinc-200 w-3/5 h-screen px-[2vw] py-[4vw]">
        <div className="header flex justify-between py-[1vw] border-b-[1px] border-zinc-700 ">
          <h1 className="text-[3.5vw] ">
            My <span className="font-bold">Playground</span>{" "}
          </h1>
          <div
            onClick={openCreateNewFolderModal}
            className="flex gap-[.5vw] items-center cursor-pointer "
          >
            <div className="flex items-center hover:scale-90 shadow-xl shadow-inner hover:shadow-zinc-700 transition-all duration-500 ">
              <ImPlus className="text-[1.3vw] " />
              <span className="text-[1.3vw]  ">New Folder</span>
            </div>
          </div>
        </div>
        {folders?.map((folder, index) => {
          return (
            <Folder
              folderTitle={folder?.title}
              cards={folder?.files}
              key={index}
              folderId={folder.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default RightComponent;
