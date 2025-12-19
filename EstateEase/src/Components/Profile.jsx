import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser, removeUser } from "../utils/userSlice";
import { addPost } from "../utils/postSlice";
import PostPage from "./PostPage";
import { addSelectedPost } from "../utils/selectedSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName || " ");
  const [lastName, setLastName] = useState(user.lastName || " ");
  const [emailId, setEmailId] = useState(user.emailId || " ");
  const [avatar, setAvatar] = useState(user.avatar || "/noavatar.jpg");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myposts = useSelector((store) => store.post);
  const [posts, setPosts] = useState([]);
  const [alllikedposts, setallLikedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const handlePostPage = (post) => {
    // console.log("postsss:", post);
    dispatch(addSelectedPost(post));
    navigate("/postpage");
  };

  const getMyPosts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/myposts", {
        withCredentials: true,
      });
      dispatch(addPost(res?.data?.data));
      setPosts(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);
  // console.log("posts: ", posts);

  const getAllLikedPosts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/alllikedposts", {
        withCredentials: true,
      });
      setallLikedPosts(res?.data?.data);
      // console.log("resss:", res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllLikedPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/login");
      alert(`You have been logged out.`);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmLogout = () => {
    setShowPopUp(true);
  };

  const cancelLogout = () => {
    setShowPopUp(false);
  };

  return (
    <div className="px-10 bg-black">
      <div className="flex pt-2">
        <div
          style={{
            overflowY: "scroll",
            height: "100vh",
            width: "50vw",
            // background: "#FBF8EF",
            // border: "1px solid gray",
          }}
        >
          <div className="flex justify-between">
            <div className="m-2 p-2 text-3xl font-serif">User Information</div>
            <Link to="/updateprofile">
              <button className="m-2 p-2 w-[130px] bg-teal-600 hover:bg-teal-700 text-white rounded-sm font-light transition-transform  hover:scale-105">
                Update Profile
              </button>
            </Link>
          </div>
          <div className="flex flex-col m-2 p-2">
            <div className="flex">
              <div className="py-3 font-semibold text-gray-300 ">Avatar: </div>
              <div className="pl-3">
                <img className="h-12 w-12 rounded-[50px]" src={avatar} alt="" />
              </div>
            </div>

            <span className="py-2 text-gray-300 font-semibold">
              Username: {firstName + " " + lastName}
            </span>
            <span className="py-2 text-gray-300 font-semibold">
              E-mail: {emailId}
            </span>
          </div>
          <div className="flex m-2 p-2 gap-2">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-md transition-transform hover:scale-105"
              onClick={confirmLogout}
            >
              Logout
            </button>
            {showPopUp && (
              <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-base-200 p-6 rounded-lg shadow-2xs text-center w-80">
                  <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to logout?
                  </h2>
                  <div className="flex justify-around">
                    <button
                      className="bg-red-500 text-white cursor-pointer transition-transform hover:scale-105 px-4 py-2 rounded"
                      onClick={handleLogout}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-300 text-black cursor-pointer transition-transform hover:scale-105 px-4 py-2 rounded"
                      onClick={cancelLogout}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="m-2 p-2 text-3xl font-serif">My List</div>
            <Link to="/newpostpage">
              <button className="m-2 p-2 h-10 w-[130px] bg-teal-600 hover:bg-teal-700 text-white rounded-sm font-light transition-transform  hover:scale-105">
                Create New Post
              </button>
            </Link>
          </div>
          <div className="m-0 p-2 mb-5">
            <ul>
              {posts.map((post, index) => (
                <li
                  key={post._id || index}
                  onClick={() => handlePostPage(post)}
                  className="m-2 p-4 rounded-xl shadow-md bg-base-300 flex justify-between items-center transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <div className="text-white space-y-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {post?.title}
                    </h3>
                    <p className="text-gray-300">Place: {post.address}</p>
                    <p className="text-teal-400 font-medium">
                      Price: ₹{post?.Price}
                    </p>
                  </div>
                  <div className="ml-6">
                    <img
                      src={post?.images[0]}
                      alt="post"
                      className="h-36 w-36 rounded-lg border-2 border-gray-300 shadow-sm"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="m-2 p-2 text-3xl font-serif">Liked Posts</h1>
          <div
            className="pr-12"
            style={{
              overflowY: "scroll",
              height: "100vh",
              width: "50vw",
              // background: "#F6F0F0",
              // border: "1px solid gray",
            }}
          >
            <div className="m-0 p-2 mb-5">
              <ul>
                {alllikedposts.map((post, index) => (
                  <li
                    key={post._id || index}
                    onClick={() => handlePostPage(post)}
                    className="m-2 p-4 rounded-xl shadow-md bg-base-300 flex justify-between items-center transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="text-white space-y-2">
                      <h3 className="text-2xl font-semibold text-white">
                        {post?.title}
                      </h3>
                      <p className="text-gray-300">Place: {post.address}</p>
                      <p className="text-teal-400 font-medium">
                        Price: ₹{post?.Price}
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        src={post?.images[0]}
                        alt="post"
                        className="h-36 w-36 rounded-lg border-2 border-gray-300 shadow-sm"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            height: "100vh",
            width: "50vw",
            background: "#F6F0F0",
            border: "1px solid gray",
          }}
        >
          <div>
            <div className="m-2 p-4 text-3xl text-black font-thin">
              Messages
            </div>
          </div>
          <div className="m-2 p-2">
            <div className="h-screen rounded-md bg-[#FBFBFB] ">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
