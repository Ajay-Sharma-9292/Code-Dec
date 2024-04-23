import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

const intialData = [
  {
    id: v4(),
    title: "DSA",
    files: [
      {
        id: v4(),
        title: "index",
        code: `cout<<"Hello World";`,
        language: "cpp",
      },
    ],
  },
  {
    id: v4(),
    title: "Frontend",
    files: [
      {
        id: v4(),
        title: "test",
        code: `console.log("Hello Frontend")`,
        language: "javascript",
      },
    ],
  },
];

export const defaultCode = {
  [`cpp`]: `
   #include <iostream>
    int main(){
        std::cout<<"hello cpp";
        return 0;
    }`,

  [`javascript`]: `console.log("hello javascript")`,

  [`python`]: `print("hello python")`,

  [`java`]: `
    public class Main {
        public static void main(String[] args) {
            System.out.println("hello java");
        }
    }
    `,
};

const PlaygroundProvider = ({ children }) => {
  const [folders, setfolders] = useState(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      return JSON.parse(localData);
    }
    return intialData;
  });

  const createNewPlayground = (newPlayground) => {
    const { fileName, folderName, language } = newPlayground;
    const newFolders = [...folders];
    newFolders.push({
      id: v4(),
      title: folderName,
      files: [
        {
          id: v4(),
          title: fileName,
          code: defaultCode[language],
          language,
        },
      ],
    });
    localStorage.setItem("data", JSON.stringify(newFolders));
    setfolders(newFolders);
  };

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      title: folderName,
      files: [],
    };
    const allFolders = [...folders, newFolder];
    localStorage.setItem("data", JSON.stringify(allFolders));
    setfolders(allFolders);
  };

  const deleteFolder = (id) => {
    const updateFoldersList = folders.filter((folderItem) => {
      return folderItem.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(updateFoldersList));
    setfolders(updateFoldersList);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updatedFoldersList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        folderItem.title = newFolderName;
      }
      return folderItem;
    });
    localStorage.setItem("data", JSON.stringify(updatedFoldersList));
    setfolders(updatedFoldersList);
  };

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = copiedFolders[i].files;
        for (let j = 0; j < files.length; j++) {
          if (files[i].id === fileId) {
            files[i].title = newFileName;
            break;
          }
        }
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setfolders(copiedFolders);
  };

  const deleteFile = (folderId, fileId) => {
    const copiedFolders = [...folders];
    for(let i = 0; i < copiedFolders.length; i++){
      if(copiedFolders[i].id === folderId){
        const files = [...copiedFolders[i].files];
        copiedFolders[i].files = files.filter((file) =>{
          return file.id !== fileId;
        })
        break;
      }
    }
    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setfolders(copiedFolders);
  }

  const createPlayground = (folderId, file) => {
    const copiedFolders = [...folders];
    for(let i = 0; i < copiedFolders.length; i++){
      if(copiedFolders[i].id ===folderId){
        copiedFolders[i].files.push(file);
        break;
      }
    }
    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setfolders(folders);
  }

  const getDefaultCode = (fileId, folderId) => {
    for(let i=0 ; i < folders.length ; i++ ){
      if(folders[i].id === folderId){
        for(let j = 0 ; j < folders[i].files.length ; j++ ){
          const currentFile = folders[i].files[j];
          if(fileId === currentFile.id){
            return currentFile.code ;
          }
        }
      }
    }

  }

  const getLanguage = (fileId, folderId) => {
    for(let i=0 ; i < folders.length ; i++ ){
      if(folders[i].id === folderId){
        for(let j = 0 ; j < folders[i].files.length ; j++ ){
          const currentFile = folders[i].files[j];
          if(fileId === currentFile.id){
            return currentFile.language ;
          }
        }
      }
    }

  }

  const updateLanguage = (fileId, folderId, language) => {
    const newFolders = [...folders];
    for(let i=0 ; i < newFolders.length ; i++ ){
      if(newFolders[i].id === folderId){
        for(let j = 0 ; j < newFolders[i].files.length ; j++ ){
          const currentFile = newFolders[i].files[j];
          if(fileId === currentFile.id){
           newFolders[i].files[j].code = defaultCode[language]
           newFolders[i].files[j].language = language;
          }
        }
      }
    }
  localStorage.setItem("data", JSON.stringify(newFolders));
    setfolders(newFolders);
  }
  
  const saveCode = (fileId, folderId, newCode) => {
    const newFolders = [...folders];
    for(let i=0 ; i < newFolders.length ; i++ ){
      if(newFolders[i].id === folderId){
        for(let j = 0 ; j < newFolders[i].files.length ; j++ ){
          const currentFile = newFolders[i].files[j];
          if(fileId === currentFile.id){
           newFolders[i].files[j].code = newCode;
          }
        }
      }
    }
  localStorage.setItem("data", JSON.stringify(newFolders));
    setfolders(newFolders);
  }

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, []);

  const PlaygroundFeatures = {
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode
  };

  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
