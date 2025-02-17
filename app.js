import express from "express";
import "dotenv/config";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res)=>{
    res.render("index");
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
