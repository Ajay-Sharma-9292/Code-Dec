import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import EditorContainer from "./EditorContainer";
import { makeSubmission } from "./Service";
import { motion } from "framer-motion";

const PlaygroundScreen = () => {
  const params = useParams();
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");
  const { fileId, folderId } = params;
  const [showLoader, setshowLoader] = useState(false);

  const importInput = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        setinput(e.target.result);
      };
    } else {
      alert("please choose a text file");
    }
  };

  const exportOutput = () => {
    const outputValue = output.trim();
    if (!outputValue) {
      alert("output is empty");
      return;
    }
    const blob = new Blob([outputValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.txt`;
    link.click();
  };

  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setshowLoader(true);
    } else if (apiStatus === "error") {
      setshowLoader(false);
      setoutput("something went wrong");
    } else {
      setshowLoader(false);
      if (data.status.id === 3) {
        setoutput(atob(data.stdout));
      } else {
        setoutput(atob(data.stderr));
      }
    }
  };

  const runCode = useCallback(({ code, language }) => {
      makeSubmission({ code, language, input, callback });
    },[input]);

  return (
    <>
      <div className="playground-container w-full h-screen grid grid-cols-3 grid-row-2 gap-[5px] bg-black ">
        <div className="header-of-playground-container self-start col-span-3 text-white flex gap-[1vw] items-center justify-center w-full h-[10vh] bg-zinc-800 ">
          <img
            className="w-20 h-20 "
            src="https://code-deck.vercel.app/static/media/logo.cba940861dd8aabf4a90.png"
            alt=""
          />
          <h1 className=" text-4xl">
            <span className="font-semibold">Code</span> Dec
          </h1>
        </div>
        <EditorContainer
          fileId={fileId}
          folderId={folderId}
          runCode={runCode}
        />
        <div className="input-output-container flex flex-col">
          <div className="input-container flex flex-col h-1/2 overflow-hidden row-span-1  ">
            <div className="input-header flex items-center justify-between px-[1vw] bg-zinc-400  w-full h-[9vh]">
              <div className=" flex items-center h-full">
                <h1 className="text-[2vw] font-bold">Input :</h1>
              </div>
              <label className="flex gap-[1vw] h-1/2 items-center shadow-lg hover:shadow-zinc-300 hover:scale-90 transition-all duration-500 ">
                {" "}
                <BiImport className="font-bold text-[1.8vw]" />
                <input className="hidden" type="file" onChange={importInput} />
                <span className="text-[1.5vw]">Import Code</span>
              </label>
            </div>
            <textarea
              onChange={(e) => setinput(e.target.value)}
              value={input}
              className=" input-screen overflow-y-scroll w-full grow resize-none focus:outline-none focus:ring px-[.5vw] py-[1vw] "
            ></textarea>
          </div>
          <div className="output-container flex flex-col h-1/2 overflow-hidden row-span-1  ">
            <div className="output-header flex items-center justify-between px-[1vw] bg-zinc-400  w-full h-[9vh]">
              <div className=" flex items-center h-full">
                <h1 className="text-[2vw] font-bold">Output :</h1>
              </div>
              <a
                onClick={exportOutput}
                className="flex gap-[1vw] h-1/2 items-center shadow-lg hover:shadow-zinc-300 hover:scale-90 transition-all duration-500 "
                href=""
              >
                <BiExport className="font-bold text-[1.8vw]" />
                <span className="text-[1.5vw]">Export Output</span>
              </a>
            </div>
            <textarea
              readOnly
              onChange={(e) => setoutput(e.target.value)}
              value={output}
              className=" input-screen overflow-y-scroll w-full grow resize-none focus:outline-none focus:ring px-[.5vw] py-[1vw] "
            ></textarea>
          </div>
        </div>
        {showLoader && (
          <div className="fullpage-loader flex items-center justify-center bg-zinc-900/50 fixed top-0 bottom-0 left-0 right-0 ">
            <motion.div
              initial={{ rotate: "0deg" }}
              animate={{ rotate: "360deg" }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="loader bg-red-950/50 rounded-full border-[25px] border-dashed border-green-800 w-[6vw] h-[6vw]"
            ></motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaygroundScreen;
