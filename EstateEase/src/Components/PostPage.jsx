import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PostPage = () => {
  const selectedPost = useSelector((state) => state.selectedPost);
  const user = useSelector((state) => state.user);
  const [countimg, setCountimg] = useState(0);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "ArrowRight") handleSlideRight();
  //     if (e.key === "ArrowLeft") handleSlideLeft();
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [countimg]);

  if (!selectedPost) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center text-2xl font-semibold">
        No post selected or state lost on refresh.
      </div>
    );
  }

  const handleSlideRight = () => {
    if (countimg < selectedPost.images.length - 1) {
      setCountimg(countimg + 1);
    }
  };

  const handleSlideLeft = () => {
    if (countimg > 0) {
      setCountimg(countimg - 1);
    }
  };

  const {
    title,
    address,
    Price,
    phoneNo,
    description,
    images,
    bedroom,
    bathroom,
    lattitude,
    longitude,
    type,
    size,
    incomePolicy,
    utilityPolicy,
    petPolicy,
  } = selectedPost;

  return (
    <div className="bg-black min-h-screen p-6 sm:p-10 text-white">
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-6 sm:p-10 space-y-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image + Arrows */}
          <div className="w-full lg:w-1/2 relative group">
            <img
              src={images?.[countimg] || "/placeholder.jpg"}
              alt={`Post Image ${countimg + 1}`}
              className="w-full h-96 object-cover rounded-lg border border-gray-700 shadow-md"
            />

            {/* Left Arrow */}
            <button
              onClick={handleSlideLeft}
              disabled={countimg === 0}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full z-10 transition disabled:opacity-30"
            >
              <svg className="h-6 w-6 text-white rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleSlideRight}
              disabled={countimg === images.length - 1}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full z-10 transition disabled:opacity-30"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Post Info */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-teal-400">{title}</h1>
            <p className="text-lg text-gray-300">📍 {address}</p>
            <p className="text-xl font-semibold text-green-400">₹ {Price}</p>
            <p className="text-sm text-gray-400 italic">
              Posted by: {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Unknown"}
            </p>
            <p className="text-sm text-gray-400 italic">Phone No: {phoneNo}</p>
            <p className="text-sm text-gray-400">{description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-300 pt-4 border-t border-gray-700">
              <div>🛏 Bedroom: {bedroom}</div>
              <div>🛁 Bathroom: {bathroom}</div>
              <div>📐 Size: {size} sqr. feet</div>
              <div>🏠 Type: {type}</div>
              <div>📍 Latitude: {lattitude}</div>
              <div>📍 Longitude: {longitude}</div>
              <div>💼 Income Policy: {incomePolicy}</div>
              <div>🚰 Utility Policy: {utilityPolicy}</div>
              <div>🐶 Pet Policy: {petPolicy}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
