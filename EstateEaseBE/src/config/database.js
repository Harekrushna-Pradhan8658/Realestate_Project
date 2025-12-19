const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://NamasteDev:NamasteDev1234@namaskarnode.dy17r.mongodb.net/EstateEase");
};

module.exports = connectDB;