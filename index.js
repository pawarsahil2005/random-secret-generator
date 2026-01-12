// 1. Import express and axios

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

// 2. Use the public folder for static files.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/" , (req,res) => {
//     res.render("index.ejs" , {secret:"hi" , user:"sahil"});
// })

app.get("/", async (req,res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs" ,
        {
            secret: result.data.secret,
            user: result.data.username
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port , () => {
    console.log(`Server is running on the port ${port}.`);
});
