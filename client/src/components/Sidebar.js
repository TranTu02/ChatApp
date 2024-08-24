import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails.js";
import Divider from "./Divider.js";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser.js";
import moment from "moment";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const socketConnection = useSelector((state) => state?.user?.socketConnection);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);
      socketConnection.on("conversation", (data) => {
        console.log("Conversation: ", data);
        let conversationUserData = [];
        conversationUserData = data.map((conversationUser, index) => {
          return {
            ...conversationUser,
            userDetails: conversationUser?.sender,
          };
          // if (conversationUser?.sender?._id !== conversationUser?.receiver?._id) {
          //   return {
          //     ...conversationUser,
          //     userDetails: conversationUser?.sender,
          //   };
          // } else if (conversationUser?.receiver?._id !== user?._id) {
          //   return {
          //     ...conversationUser,
          //     userDetails: conversationUser.receiver,
          //   };
          // } else {
          //   return {
          //     ...conversationUser,
          //     userDetails: conversationUser.sender,
          //   };
          // }
        });
        setAllUser(conversationUserData);
        console.log("ALL USER: ", allUser);
      });
    }
  }, [socketConnection, user]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] ">
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
          <div
            className="w-12 h-12  flex justify-center items-center  cursor-pointer hover:bg-slate-200 rounded"
            title="Add friend"
            onClick={() => setOpenSearchUser(true)}
          >
            <FaUserPlus size={30} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  ">
          <button className="mx-auto mb-1 cursor-pointer" onClick={() => setEditUserOpen(true)}>
            <Avatar width={35} height={35} imageUrl={user.profile_pic} name={user.name} userID={user?._id} />
          </button>
          <button className="-ml-2 cursor-pointer" title="Log out">
            <BiLogOut size={30} />
          </button>
        </div>
      </div>
      <div className="w-full ">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800 ">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)]  overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-500">Explore users to start a conversation</p>
            </div>
          )}

          {allUser.map((conv, index) => {
            return (
              <div key={conv?.userDetails?._id} className="flex justify-start items-center gap-2 w-full my-2">
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full justify-between">
                    <h2 className="font-semibold line-clamp-1 overflow-hidden">{conv?.userDetails?.name}</h2>
                    <div className="rounded-full bg-primary flex items-center h-6 w-6 justify-center">
                      <p className="text-sm p-0 m-0">12</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between w-full">
                    <h3 className="p-0 m-0 line-clamp-1">
                      {conv?.lastMsg?.msgByUserId === user?._id ? conv?.receiver?.name : conv?.sender?.name}:{" "}
                      {conv?.lastMsg?.videoUrl !== ""
                        ? "sent a video"
                        : conv?.lastMsg?.imageUrl !== ""
                        ? "sent a picture"
                        : conv?.lastMsg?.text}
                    </h3>
                    <h3 className="text-xs h-5 ">{moment(conv?.lastMsg?.createdAt).format(`hh:mm A`)}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {
        // edit user detail
        editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      }

      {
        //serach user
        openSearchUser && <SearchUser onClose={() => setOpenSearchUser(false)} />
      }
    </div>
  );
};

export default Sidebar;
