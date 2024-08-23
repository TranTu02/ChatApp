import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userID, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  let avatarName = "";
  if (name) {
    const splitName = name?.trim().split(" ");
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

  const isOnline = onlineUser.includes(userID);

  return (
    <div
      className={`flex relative items-center justify-center text-slate-800 rounded-full shadow border text-xl font-bold`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : name ? (
        <div
          className={`flex items-center justify-center overflow-hidden rounded-full  text-xl  ${bgColor[randomNumber]}`}
          style={{ width: width + "px", height: height + "px", fontSize: width / 2 }}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle className="bg-gray-200 object-cover w-full h-full rounded-full" />
      )}

      {isOnline && <div className="bg-green-600 p-1  absolute bottom-2 -right-1 z-10 rounded-full "></div>}
    </div>
  );
};

export default Avatar;
