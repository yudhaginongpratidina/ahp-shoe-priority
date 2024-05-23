const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");


// ====================================================
// IMPORT ROUTES
// ====================================================
const routes = require("./routes.js");

// ====================================================
// INIT
// ====================================================
dotenv.config();
const app = express();


// ====================================================
// MIDDLEWARE
// ====================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// ====================================================
// SERVER LISTEN
// ====================================================
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})