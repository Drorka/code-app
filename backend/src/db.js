require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const mongoConnect = async (callback) => {
	try {
		await mongoose.connect(mongoURI);
		console.log("Connected to MongoDB");
		callback();
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

module.exports = { mongoConnect };
