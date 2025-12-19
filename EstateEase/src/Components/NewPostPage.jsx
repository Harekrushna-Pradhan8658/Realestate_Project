import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../utils/postSlice";

function NewPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [lattitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [incomePolicy, setIncome] = useState("");
  const [size, setSize] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [type, setType] = useState("");
  const [property, setProperty] = useState("");
  const [utilityPolicy, setUtility] = useState("");
  const [petPolicy, setPetPolicy] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const user = useSelector((store) => store.user);
  // console.log("user id:", user);
  const dispatch = useDispatch();

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setIsLoading(true);
    const uploadPhotos = [];

    for (const file of files) {
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
          uploadPhotos.push(result.secure_url);
        } else {
          console.error("Cloudinary error:", result.error);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    // console.log(uploadPhotos);
    setPhotos(uploadPhotos);
    setIsLoading(false);
  };

  const handlePost = async () => {
    // e.preverntDeafult();

    if (!title || !Price || !address || !city || !photos.length) {
      alert(
        "Please fill all the required fields and upload at leaset one photo."
      );
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/addpost",
        {
          _id: user._id,
          title,
          Price: Number(Price),
          images: photos,
          address,
          city,
          bedroom: Number(bedroom),
          bathroom: Number(bathroom),
          longitude: Number(longitude),
          lattitude: Number(lattitude),
          incomePolicy,
          size: Number(size),
          phoneNo: Number(phoneNo),
          type,
          property,
          utilityPolicy,
          petPolicy,
          description,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addPost(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Post submission error:", err);
      alert("Something went wrong while submitting the post.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      {/* Form Section */}
      <div className="flex-[3] p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-8">Add New Post</h1>

        <div className="flex flex-wrap gap-6">
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Price</label>
            <input
              id="Price"
              name="Price"
              type="Number"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Address</label>
            <input
              id="Address"
              name="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">City</label>
            <input
              id="City"
              name="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Bedroom Number
            </label>
            <input
              id="Bedroom"
              name="Bedroom"
              type="Number"
              value={bedroom}
              onChange={(e) => setBedroom(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Bathroom Number
            </label>
            <input
              id="Bathroom"
              name="Bathroom"
              type="Number"
              value={bathroom}
              onChange={(e) => setBathroom(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Longitude</label>
            <input
              id="Longitude"
              name="Longitude"
              type="Number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Latitude</label>
            <input
              id="Latitude"
              name="Latitude"
              type="Number"
              value={lattitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Income Policy
            </label>
            <input
              id="Income"
              name="Income"
              type="text"
              value={incomePolicy}
              onChange={(e) => setIncome(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Size (Sqr. feet)
            </label>
            <input
              id="Size"
              name="Size"
              type="Number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Phone Number
            </label>
            <input
              id="Phone"
              name="Phone"
              type="Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Select Inputs */}

          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Type</label>
            <select
              name="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option className="text-black">type</option>
              <option className="text-black">rent</option>
              <option className="text-black">buy</option>
            </select>
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Property</label>
            <select
              name="Property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option className="text-black">propery</option>
              <option className="text-black">apartment</option>
              <option className="text-black">house</option>
              <option className="text-black">land</option>
              <option className="text-black">condo</option>
            </select>
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Utility Policy
            </label>
            <select
              name="Utility"
              value={utilityPolicy}
              onChange={(e) => setUtility(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option className="text-black">utilities</option>
              <option className="text-black">owner</option>
              <option className="text-black">tenant</option>
              <option className="text-black">shared</option>
            </select>
          </div>
          <div className="w-full md:w-[48%] lg:w-[30%] flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Pet Policy</label>
            <select
              name="pet"
              value={petPolicy}
              onChange={(e) => setPetPolicy(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option className="text-black">pet</option>
              <option className="text-black">allowed</option>
              <option className="text-black">not-allowed</option>
            </select>
          </div>

          {/* Description */}
          <div className="w-full flex flex-col mt-4">
            <label htmlFor="desc" className="mb-1 font-medium text-gray-200">
              Description
            </label>
            <textarea
              name="desc"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-600 rounded p-3 bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter description here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="w-full mt-6">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 mb-8 rounded w-full md:w-auto"
              onClick={handlePost}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="flex-[2] p-8 bg-gray-900 flex flex-col items-center gap-8 shadow-inner border-t lg:border-l lg:border-t-0 border-gray-800">
        {/* Uploaded Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-items-center">
          {photos.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Photo ${index + 1}`}
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-lg shadow-md border border-gray-700 hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-sm bg-gray-800 rounded-xl p-6 flex flex-col items-center gap-4 border border-gray-700 shadow-lg mb-10">
          {isLoading ? (
            <p className="text-gray-300 font-medium">Uploading...</p>
          ) : (
            <img
              src="https://www.svgrepo.com/show/510302/upload.svg"
              alt="Upload Preview"
              className="w-32 h-32 object-contain rounded-full border border-gray-600 bg-gray-700 p-4"
            />
          )}

          <label className="cursor-pointer w-full text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="file-input text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-700 file:text-white
              hover:file:bg-teal-600"
            />
          </label>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Post added successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPostPage;
