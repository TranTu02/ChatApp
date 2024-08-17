import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userID, name, imageUrl, width, height }) => {
  let avatarName = "";
  if (name) {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-blue-200",
  ];
  const randomNumber = Math.floor(Math.random() * 9);
  return (
    <div
      className={`flex items-center justify-center text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : name ? (
        <div
          className={`flex items-center justify-center overflow-hidden rounded-full text-white text-xl  ${bgColor[randomNumber]}`}
          style={{ width: width + "px", height: height + "px", fontSize: width / 2 }}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle className="bg-gray-200 object-cover w-full h-full" />
      )}
    </div>
  );
};

export default Avatar;
