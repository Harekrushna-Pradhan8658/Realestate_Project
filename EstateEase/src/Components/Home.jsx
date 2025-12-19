import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addMatchingPost } from "../utils/matchingPostSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [address, setAddress] = useState("");
  const [selectedType, setSelectedType] = useState("buy");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSerch = async () => {
    if (!address.trim()) {
      console.warn("⚠️ Please enter a city or address.");
      return;
    }

    if (!lowPrice || !highPrice || isNaN(lowPrice) || isNaN(highPrice)) {
      console.warn("⚠️ Please enter valid price values.");
      return;
    }

    if (parseInt(lowPrice) > parseInt(highPrice)) {
      console.warn("⚠️ Minimum price should be less than maximum price.");
      return;
    }
    try {
      const res = await axios.get(
        BASE_URL +
          "/search/" +
          address +
          "/" +
          lowPrice +
          "/" +
          highPrice +
          "/" +
          selectedType,
        { withCredentials: true }
      );
      if (res.data && res.data.data?.length > 0) {
        console.log("✅ Matching posts found:", res.data.data);
        dispatch(addMatchingPost(res.data.data));
        navigate("/searchedpost");

      } else {
        console.info("ℹ️ No matching posts found.");
      }
    } catch (err) {
      console.error(
        "❌ Failed to fetch search results:",
        err?.response?.data?.message || err.message
      );
    }
  };
  return (
    <div className="relative w-screen h-screen flex flex-col">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-35 flex items-center pl-14">
          <h1 className="text-white text-6xl font-bold mb-82">
            Find Real Estate & Get <br /> Your Dream Place
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center pl-16 -mt-5  text-[#FBF8EF] font-semibold ">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse velit
            cumque repellat quas pariatur.
            <br /> Autem exercitationem, iusto, ex, nisi rerum ipsa corrupti
            illo beatae veritatis ipsum dolorem laboriosam?
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center pl-16 pt-28">
          <div className="flex flex-col pt-28 z-40">
            <span>
              <button
                className={`border-2 border-gray-800 py-4 w-[100px] rounded-tl-md border-b-0 font-semibold ${
                  selectedType === "buy"
                    ? "bg-yellow-400"
                    : "bg-black text-white"
                }`}
                onClick={() => setSelectedType("buy")}
              >
                Buy
              </button>
              <button
                className={`border-y-2 border-r-2 border-gray-800 py-4 w-[100px] rounded-tr-md border-b-0 font-semibold ${
                  selectedType === "rent"
                    ? "bg-yellow-400"
                    : "bg-black text-white"
                }`}
                onClick={() => setSelectedType("rent")}
              >
                Rent
              </button>
            </span>
            <span className="z-40">
              <input
                type="text"
                placeholder="City Location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-[65px] w-[200px] bg-transparent border-2 border-gray-800 
            placeholder:text-white font-semibold rounded-bl-md p-2"
              />
              <input
                type="number"
                name="minPrice"
                min={0}
                max={10000000}
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
                placeholder="Min Price"
                className="h-[65px] bg-transparent border-2 border-gray-800 border-l-0
                placeholder:text-white font-semibold  w-[200px] p-2"
              />
              <input
                type="number"
                name="maxPrice"
                min={0}
                max={10000000}
                value={highPrice}
                onChange={(e) => setHighPrice(e.target.value)}
                placeholder="Max Price"
                className="h-[65px] bg-transparent border-2 border-gray-800
                border-r-0 border-l-0 placeholder:text-white font-semibold w-[200px] p-2"
              />
              <button
                className="h-[65px]  border-2  font-semibold 
              w-[80px] rounded-tr-md rounded-br-md bg-yellow-400 border-l-0 border-amber-400 cursor-pointer hover:bg-amber-400"
                onClick={handleSerch}
              >
                Search
              </button>
            </span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center pl-16 pt-[500px]">
            <span className="p-10 pl-0">
              <div className="font-bold text-3xl">16+</div>
              <div className="font-semibold text-xl">Years of Experience</div>
            </span>
            <span className="p-10 pl-0">
              <div className="font-bold text-3xl">200</div>
              <div className="font-semibold text-xl">Award Gained</div>
            </span>
            <span className="p-10 pl-0">
              <div className="font-bold text-3xl">2000+</div>
              <div className="font-semibold text-xl">Property Ready</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
