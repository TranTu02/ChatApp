import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";

const SearchUser = (onClose) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 px-12">
      <div className="w=full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex ">
          <input
            type="text"
            placeholder="Search user by name, email, ...."
            className="w-full outline-none py-1 h-full px-4"
          />
          <div className="flex items-center justify-center w-14">
            <IoSearchOutline size={30} />
          </div>
        </div>

        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
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
              return <UserSearchCard key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
