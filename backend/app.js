import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import useRouter from "./Routers/useRouter.js";
import http from "http";
import { Server } from "socket.io";
import { connect } from "http2";
import { RenderAndShowArr } from "./Controllers/gameController.js";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, { cors: "*" });
config();
const PORT = process.env.PORT || 8080;

let participents = [];
io.on("connection", (socket) => {
 
  socket.on("joinGame", (user, room) => {
    const { userName } = user;
    console.log("connected");
    
      if (participents.length === 0) {
        //אם החדר לא במשחק עדיין וזה המשתנה הראשון
        participents.push(userName);
        console.log(userName);
        socket.emit("player", "Waiting for the other player to join");
      } else if (participents.length === 1 && participents[0] !== userName) {
        participents.push(userName);
        memoryCards=RenderAndShowArr();
        io.sockets.emit("player", "game started",participents,memoryCards);
      } else if (participents.length === 1 && participents[0] === userName) {
        socket.emit("player", "you already in stupido :)"); // Problometic error
      } else if (participents.length >= 2) {
        socket.emit("player", "game is already started");
      }
  });
});
//who can connect to me and if i can recieve data from the browser
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", useRouter);


mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.error(err));
