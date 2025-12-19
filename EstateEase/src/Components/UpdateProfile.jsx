import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName);
  const [avatar, setAvatar] = useState(user.avatar);
  const [showToast, setShowToast]  = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;


    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Real_State"); // Make sure this exists in your Cloudinary settings

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dh1advnyd/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (res.ok && result.secure_url) {
        setAvatar(result.secure_url);
      } else {
        console.error("Cloudinary error:", result.error);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }

    // console.log(avatar);
  };

  const editProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          avatar,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      },3000);
      // console.log(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly bg-black">
        <div className="m-5 pt-10 pl-16">
          <p className="font-semibold text-4xl text-gray-300 ">
            Update Profile
          </p>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder={firstName}
              className="p-4 mt-8 w-[230px] border border-slate-600 rounded bg-gray-300 text-slate-800"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder={lastName}
              className="p-4 mt-8 w-[230px] border border-slate-600 rounded bg-gray-300 text-slate-800"
              onChange={(e) => setLastName(e.target.value)}
            />
            <button
              className="p-4 mt-8 w-[230px] bg-teal-600 hover:bg-teal-700 text-white rounded-md cursor-pointer transition-transform hover:scale-105"
              onClick={editProfile}
            >
              Update
            </button>
          </div>
        </div>
        <div className="h-[580px] w-[300px] bg-base-100 shadow-2xl  transition-transform hover:scale-105 rounded-2xl">
          {avatar ? (
            <img
              className="h-65 w-65 mt-32 ml-5 rounded-full"
              src={avatar}
              alt=""
            />
          ) : (
            <img
              className="h-56 mt-32 ml-10 rounded-full"
              src="noavatar.jpg"
              alt=""
            />
          )}
          <label className="cursor-pointer w-full text-center">
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-700 file:text-white
              hover:file:bg-teal-600 mt-5"
            />
          </label>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
