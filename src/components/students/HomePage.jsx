import React from "react";
import "../../assets/css/sidebar.css";
import MainRight from "./MainRight";
import Home from "./Home";

const successColor = {
  position: "fixed",
  bottom: "30px",
  fontSize: "12px",
  right: "10px",
  zIndex: "10000",
  color: "#38cb89"
};

const HomePage = () => {
  return (
    <>
      <div>
        <div className="fixed top-[10px] right-[30px]">
          <p style={{ fontSize: ".625rem" }}>APHL</p>
        </div>
        <div className="flex sticky">
          <MainRight />
          <div className="w-full h-screen">
            <div className="grow p-[20px]">
              <Home />
            </div>
            <span style={successColor}>Online: 10442</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
