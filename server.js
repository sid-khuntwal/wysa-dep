const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
}
// --------------------------deployment------------------------------

try {
  io.on("connection", (socket) => {
    console.log("New user connected");
    console.log("User Connected", socket.id);

    const messages = [
      "Hi there! 👋",
      "I'm Wysa - an AI chatbot built by therapists.",
      "I'm here to understand your concerns and connect you with the best resources available to support you.",
      "Can I help?",
    ];
    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        socket.emit("message", messages[index]);

        if (index === messages.length - 1) {
          setTimeout(() => {
            socket.emit("image", process.env.WYSA_IMAGE);
          }, 1500);
        }
        index++;
      } else {
        clearTimeout();
        clearInterval(interval);
      }
    }, 1500);

    socket.on("sendMessage", (message) => {
      setTimeout(() => {
        io.emit("message", message);
      }, 2000);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      clearInterval(interval);
    });
  });
} catch (err) {
  console.log(err);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
app.use(
  cookieSession({
    name: "sid-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

const db = require("./app/models");

db.mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

require("./app/routes/auth.routes")(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
