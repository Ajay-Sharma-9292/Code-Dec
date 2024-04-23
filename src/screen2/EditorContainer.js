import React, { useContext, useRef, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdFullscreen } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
import { PlaygroundContext } from "../Providers/PlaygroundProvider";


const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(PlaygroundContext);
  const [code, setcode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });

  const [language, setlanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, settheme] = useState("vs-dark");
  const codeRef = useRef();
  const [isFullScreen, setisFullScreen] = useState(false);

  const fileExtensionMapping = {
    cpp: "cpp",
    javascript: "js",
    python: "py",
    java: "java",
  };

  const editorOptions = {
    fontSize: 20,
    wordWrap: "on",
  };

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
  };

  const importCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setcode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      alert("please choose the program file");
    }
  };

  const exportCode = () => {
    const codeValue = codeRef.current?.trim();
    if (!codeValue) {
      alert("please type some code in the editor before exporting");
    }
    //Create a blob / instant file in the memory
    const codeBlob = new Blob([codeValue], { type: "text/plain" });

    // Create a downloadable link with blob data
    const downloadUrl = URL.createObjectURL(codeBlob);

    // Create a clickable link to download blob/file
    const link = document.createElement("a");
    link.href = downloadUrl;

    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
  };

  const onChangeLanguage = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    setcode(getDefaultCode(fileId, folderId));
    setlanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    settheme(e.target.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert("Code Saved Successfully");
  };

  const fullScreen = () => {
    setisFullScreen(!isFullScreen);
  };
  const styles = {
    fullScreen: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      height: "100vh",
    },
  };

  const onRunCode = () => {
    runCode({code: codeRef.current , language})
  }

  return (
    <>
      <div
        style={isFullScreen ? styles.fullScreen : {}}
        className="Editor-container flex flex-col h-[90vh] relative bg-zinc-500 grow  col-span-2 "
      >
        <div className="editor-header text-white flex justify-between w-full h-[9vh] bg-zinc-950 px-[2vw] ">
          <div className="flex gap-[1vw] h-full items-center">
            <h1 className="text-[2vw]">{"title"}</h1>
            <BiEditAlt className="text-[1.8vw] hover:scale-90 shadow-lg hover:shadow-zinc-300 transition-all duration-500" />
            <button
              onClick={onSaveCode}
              className="flex justify-center items-center bg-green-800 text-white px-[1vw] py-[.5vw]  rounded-full hover:scale-90 transition-all duration-500  "
            >
              <span className=" text-[1vw] text-red-950/50 font-bold">Save Code</span>
            </button>
          </div>
          <div className="dropDown items-center h-full flex gap-[1vw]">
            <select
              onChange={onChangeLanguage}
              value={language}
              required
              name="language"
              className="w-[8.5vw] h-[3vw] text-black cursor-pointer border-[1px] border-zinc-900 px-[1vw] py-[.7vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500 "
            >
              <option value="cpp">CPP</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
            </select>
            <select
              onChange={onChangeTheme}
              value={theme}
              required
              name="language"
              className="w-[8.5vw] text-black h-[3vw] cursor-pointer border-[1px] border-zinc-900 px-[1vw] py-[.7vw] rounded bg-blue-100 hover:scale-105 transition-all duration-500 "
            >
              <option value="vs-dark">vs-dark</option>
              <option value="vs-light">vs-light</option>
            </select>
          </div>
        </div>

        <div className="editor-body bg-zinc-900 grow">
          <Editor
            height={"100%"}
            theme={theme}
            language={language}
            options={editorOptions}
            onChange={onChangeCode}
            value={code}
          />
        </div>

        <div className="editor-footer absolute bottom-0 px-[1vw] flex items-center justify-between  bg-zinc-950 w-full h-[9vh] ">
          <button
            onClick={fullScreen}
            className="flex gap-[1vw] justify-center items-center h-1/2  text-black px-[1vw] py-[.5vw] bg-zinc-500 rounded  shadow-lg hover:shadow-zinc-300 hover:scale-90 transition-all duration-500  "
          >
            <MdFullscreen className="font-bold text-2xl" />
            <span className=" text-[1.5vw]">
              {isFullScreen ? "Minimize Screen" : "Full Screen"}
            </span>
          </button>
          <label className="flex gap-[1vw] h-1/2 items-center px-[1vw] py-[.5vw] bg-zinc-500 rounded shadow-lg hover:shadow-zinc-300 hover:scale-90 transition-all duration-500 ">
            {" "}
            <BiImport className="font-bold text-2xl" />
            <input type="file" className="hidden" onChange={importCode} />
            <span className="text-[1.5vw]">Import Code</span>
          </label>
          <a
            onClick={exportCode}
            className="flex gap-[1vw] h-1/2 items-center px-[1vw] py-[.5vw] bg-zinc-500 rounded shadow-lg hover:shadow-zinc-300 hover:scale-90 transition-all duration-500 "
            href=""
          >
            <BiExport className="font-bold text-2xl" />
            <span className="text-[1.5vw]">Export Code</span>
          </a>
          <button onClick={onRunCode} className="flex gap-[1vw] justify-center items-center h-1/2 bg-green-800 rounded-full  text-white px-[1vw] py-[.7vw]  hover:scale-90 transition-all duration-500  ">
            <FaPlay className="text-red-950/50" />
            <span className=" text-[1.5vw] text-red-950/50 font-bold">Run Code</span>
          </button>
        </div>

        
      </div>
    </>
  );
};

export default EditorContainer;
