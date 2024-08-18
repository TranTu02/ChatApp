import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails.js";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(true);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-between bg-slate-100 h-full w-12 rounded-tr-lg rounded-br-lg py-5 text-slate-600">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center  cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="Chat"
          >
            <IoChatbubbleEllipses size={30} />
          </NavLink>
          <NavLink
            className="w-12 h-12  flex justify-center items-center  cursor-pointer hover:bg-slate-200 rounded"
            title="Add friend"
          >
            <FaUserPlus size={30} />
          </NavLink>
        </div>
        <div className="flex flex-col justify-center items-center  ">
          <button className="mx-auto mb-1 cursor-pointer">
            <Avatar width={35} height={35} name={user.name} />
          </button>
          <button className="-ml-2 cursor-pointer" title="Log out">
            <BiLogOut size={30} />
          </button>
        </div>
      </div>
      {
        // edit user detail
        editUserOpen && <EditUserDetails user={user} />
      }
    </div>
  );
};

export default Sidebar;
