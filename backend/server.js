const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDB = require("./config/database")

//Handling uncaught exception
process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuting down the server due to Uncaught Exception.`);
    process.exit(1);
});

// config
dotenv.config({ path: "/backend/config/config.env" });
//connecting to databse
connectDB();
//cloudinary connection
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})
// unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuting down the server due to Unhandled Promise Rejection.`);
    server.close(() => {
        process.exit(1);
    });
});