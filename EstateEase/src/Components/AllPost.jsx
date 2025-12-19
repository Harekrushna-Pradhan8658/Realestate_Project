import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { addAllPost } from "../utils/allPostSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSelectedPost } from "../utils/selectedSlice";

const AllPost = () => {
  const [allpost, setAllPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); // ✅ Like state per post
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostPage = (post) => {
    dispatch(addSelectedPost(post));
    navigate("/postpage");
  };

  const handleLikeToggle = async (postId) => {
    try {
      const res = await axios.post(`${BASE_URL}/like/${postId}`, {}, {
        withCredentials: true,
      });

      const isLiked = res?.data?.data?.isLike;

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: isLiked,
      }));
    } catch (err) {
      console.log("Like error:", err);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getallposts`, {
        withCredentials: true,
      });
      const posts = res?.data?.data || [];
      dispatch(addAllPost(posts));
      setAllPost(posts);
    } catch (err) {
      console.log("Fetch posts error:", err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const checkLike = async (id) => {
    try {
      const res = await axios.get(BASE_URL + "/likeornot/" + id, {
        withCredentials: true,
      });
      // setIsLike(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-teal-400 mb-8 font-serif">
        All Posts
      </h1>

      {allpost.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allpost.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg transition-transform hover:scale-105 cursor-pointer mb-10"
            >
              {/* Image + Like Icon */}
              <div className="relative">
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt="Post"
                    className="h-48 w-full object-cover rounded-lg mb-4 border border-gray-600"
                    onClick={() => handlePostPage(post)}
                  />
                ) : (
                  <div
                    className="h-48 w-full bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-gray-600"
                    onClick={() => handlePostPage(post)}
                  >
                    No Image
                  </div>
                )}

                {/* Like button */}
                <button
                  onClick={() => handleLikeToggle(post._id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-xl"
                >
                  {checkLike(post._id) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Post Info */}
              <h2
                className="text-xl font-semibold text-white"
                onClick={() => handlePostPage(post)}
              >
                {post.title}
              </h2>
              <p className="text-green-400 font-medium text-lg">
                ₹ {post.Price}
              </p>
              <p className="text-sm text-gray-400 mt-1">📍 {post.address}</p>
              <p className="text-sm text-gray-400">
                🛏 {post.bedroom} | 🛁 {post.bathroom}
              </p>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {post.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
