import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-white ">
            <img src="logo.png" alt="" className="h-9 w-9 " />
            EstateEase
          </Link>
        </div>
        <div className="flex gap-2">
          
            {user ? (
              <div className="flex gap-10">
                <Link to="/allpost">
                <div className="text-lg font-semibold mt-1 hover:text-blue-400">Properties</div>
                </Link>
                <div className="text-lg font-semibold mt-1">{user?.firstName + " " + user?.lastName}</div>
              </div>
            ) : (
              <Link to="/login">
              <button className=" p-2 px-3 font-bold mr-2 mt-1  bg-black  rounded-md hover:bg-base-100 cursor-pointer ">
                SignIn
              </button>
              </Link>
            )}
          
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user?.avatar ? (
                  <img alt="" src={user?.avatar} />
                ) : (
                  <img alt="" src="noavatar.jpg" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
