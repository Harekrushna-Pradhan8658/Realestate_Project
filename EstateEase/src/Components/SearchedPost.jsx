import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedPost } from "../utils/selectedSlice";
import { useNavigate } from "react-router-dom";

const SearchedPost = () => {
  const searchpost = useSelector((store) => store.matchingPost || []);
  // console.log("searchpost", searchpost);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handlePostPage = (post) => {
      // console.log("postsss:", post);
      dispatch(addSelectedPost(post));
      navigate("/postpage");
    };

  return (
    <div className="min-h-screen bg-black p-15 space-y-4">
      <h1 className="flex items-center justify-center text-2xl font-bold">Your Properties</h1>
      {searchpost.map((post, index) => (
        <li
          key={post._id || index}
          onClick={() => handlePostPage(post)}
          className="flex items-center bg-gray-900 cursor-pointer text-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
        >
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={post.images?.[0]}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 space-y-1">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-green-400 font-medium">₹{post.Price}</p>
            <p className="text-sm text-gray-300">📞 {post.phoneNo}</p>
            <p className="text-xs text-gray-400 line-clamp-2 font-bold">{post.description}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default SearchedPost;
