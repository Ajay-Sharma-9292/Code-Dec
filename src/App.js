import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen1/HomeScreen";
import PlaygroundScreen from "./screen2/PlaygroundScreen";
import PlaygroundProvider from "./Providers/PlaygroundProvider";
import ModalProvider from "./Providers/ModalProvider";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/Playground/:fileId/:folderId" element={<PlaygroundScreen />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
