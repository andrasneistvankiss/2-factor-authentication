require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const ErrorsMiddleware = require("./middleware/mongooseErrorHandler");

process.on("uncaughtException", (error) => {
    console.log("Uncaught exeption... stopping the server...");
    console.log(error.name, error.message);
    process.exit(1);
});

const app = express();

connectToDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        hi: "Welcome to the NodeJS 2FA App",
    });
});

app.use(ErrorsMiddleware);

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

process.on("unhandledRejection", (error) => {
    console.log("Unhandled rejection... stopping the server...");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
