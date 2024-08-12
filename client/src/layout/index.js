import React from "react";
import logo from "../assets/messenger.png";
const AuthLayouts = ({ children }) => {
  return (
    <>
      <div className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img src={logo} alt="logo" width={80} height={80} />
      </div>
      {children}
    </>
  );
};

export default AuthLayouts;
