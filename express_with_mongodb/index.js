const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


main().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Database connection failed");
});

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp");
}

//insert a chat message
// let chat1 = new Chat({
//     from: "Alice",
//     to: "Bob",
//     msg: "Hello, Bob! How are you?",
//     created_at: new Date(),
// });
// chat1.save().then((res) => {
//     console.log("Chat message saved", res);
// }).catch(err => {
//     console.log("Failed to save chat message");
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride("_method"));

//ROUTES

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find({});
    res.render("index.ejs", { chats });
});

//new chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//create new post route chat route
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    await newChat.save();
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    await Chat.findByIdAndUpdate(id, { msg: newMsg });
    console.log(newMsg);
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletechat = await Chat.findByIdAndDelete(id);
    console.log("Deleted chat:", deletechat);
    res.redirect("/chats");
});

//test route
app.get("/", (req, res) => {
    res.send("working");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});