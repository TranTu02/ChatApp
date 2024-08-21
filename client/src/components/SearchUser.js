import React, { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import SearchUserCard from "./SearchUserCard";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;

    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 px-12 z-10">
      <div className="w=full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex ">
          <input
            type="text"
            placeholder="Search user by name, email, ...."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex items-center justify-center w-14">
            <IoSearchOutline size={30} />
          </div>
        </div>

        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded max-h-[75vh] overflow-auto scrollbar">
          {
            //not found
            searchUser.length === 0 && !loading && <p className="text-slate-500 text-center">No user found!</p>
          }

          {loading && (
            <span>
              <Loading />
            </span>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return <SearchUserCard key={user._id} user={user} onClose={onClose} />;
            })}
        </div>
      </div>
      <div className="flex justify-center w-full pr-24 absolute bottom-9 ">
        <button
          className=" p-2 rounded-full border-2 border-slate-500 hover:border-2 hover:border-red-500"
          onClick={onClose}
        >
          <IoClose size={40} />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
