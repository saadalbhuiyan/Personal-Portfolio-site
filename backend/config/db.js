const mongoose = require("mongoose");

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * The connection URI is read from the environment variable MONGO_URI.
 * On successful connection, logs the host of the MongoDB server.
 * If an error occurs during connection, logs the error and terminates the process.
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB with the URI from environment variables
        const { connection } = await mongoose.connect(process.env.MONGO_URI);

        // Log the host address of the connected MongoDB instance
        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (err) {
        // Log error message and exit the process with failure code
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
