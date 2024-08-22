import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import uploadFile from "../helpers/uploadFile";
import { IoClose, IoSend } from "react-icons/io5";
import Loading from "./Loading";
import wallpaper from "../assets/wallpaper.jpg";

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state.user);

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);

    setOpenImageVideoUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  const handleClearUploadPhoto = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);

    setOpenImageVideoUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo.url,
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text.trim() !== "" || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params.userID,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
      }
    }
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userID);

      socketConnection.on("message-user", (data) => {
        console.log("user details", data);
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userID, user]);
  return (
    <div
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="bg-no-repeat "
    >
      <header className="sticky top-0 h-16 px-3 bg-white flex justify-between items-center">
        <div className="flex flex-row items-center gap-3 ">
          <Link to="/" className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userID={dataUser?._id}
            />
          </div>
          <div className="ml-2">
            <h3 className="font-semibold text-lg my-0 line-clamp-1">{dataUser?.name}</h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical size={30} />
          </button>
        </div>
      </header>

      {/**show all message */}
      <section className="relative h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar  bg-slate-200 bg-opacity-15">
        {/**upload image display */}
        {message.imageUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-scroll scrollbar">
            <div onClick={handleClearUploadPhoto} className="w-fit p-2 absolute top-0 right-4 hover:text-red-600">
              <IoClose size={30} />
            </div>
            <div className="bg-white p-1">
              <img src={message.imageUrl} alt="uploadImage" className="aspect-square w-full h-full max-w-sm m-2" />
            </div>
          </div>
        )}

        {/**upload video display */}
        {message.videoUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-scroll scrollbar">
            <div onClick={handleClearUploadVideo} className="w-fit p-2 absolute top-0 right-4 hover:text-red-600">
              <IoClose size={30} />
            </div>
            <div className="bg-white p-1">
              <video
                src={message.videoUrl}
                alt="uploadVideo"
                className="aspect-square w-full h-full max-w-sm m-2"
                controls
                muted
                auto
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        )}
      </section>

      {/**send message */}
      <section className="h-16 bg-white w-full flex items-center pr-3">
        <div className="relative ">
          <button
            onClick={() => setOpenImageVideoUpload((prev) => !prev)}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <ul>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-400">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input className="hidden" type="file" id="uploadImage" onChange={handleUploadImage} />
                <input className="hidden" type="file" id="uploadVideo" onChange={handleUploadVideo} />
              </ul>
            </div>
          )}
        </div>
        <form className="w-full h-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="type here message..."
            className="py-1 px-4 outline-none w-full h-full "
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="text-primary hover:text-secondary">
            <IoSend size={30} />
          </button>
        </form>
      </section>
      {/**input box */}
    </div>
  );
};

export default MessagePage;
