import React from "react";
import RightComponent from "./RightComponent";
import LeftComponent from "./LeftComponent";
import Modal from "../Providers/Modals/Modal";


const HomeScreen = () => {
  return (
    <>
      <div className="home-container flex font-['Play']">
        <LeftComponent />
        <RightComponent />
        <Modal />
      </div>
    </>
  );
};

export default HomeScreen;
