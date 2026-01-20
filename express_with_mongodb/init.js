const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Database connection failed");
});

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp");
}

let chats = Chat.insertMany([
    {
        from: "lia",
        to: "ria",
        msg: "Hello, ria! How are you?",
        created_at: new Date(),
    },
    {
        from: "ria",
        to: "lia",
        msg: "Hi, lia! I'm good, thanks for asking.",
        created_at: new Date(),
    },
    {
        from: "ayann",
        to: "erhaa",
        msg: "I'm doing well, thanks for asking!",
        created_at: new Date(),
    },
    {
        from: "erhaa",
        to: "ayann",
        msg: "Great to hear! Let's catch up sometime soon.",
        created_at: new Date(),
    },
]);

chats.then((res) => {
    console.log("Chat messages saved", res);
}).catch(err => {
    console.log("Failed to save chat messages");
});