import express from "express";
import cors from "cors";
import { config } from "dotenv";
// import mongoose from "mongoose";
import useRouter from "./Routers/useRouter.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler,memoryGameRoomsReset} from "./sockets/MomoryGameSocketHandler.js";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, { cors: "*" });
config();
const PORT = process.env.PORT || 8080;


//socket connection-----------------
io.on("connection", (socket) => {
  let chatId;
  
  // socket.on("joinGame", (user,chatId) => {
  socket.on("joinGame", (user) => {
    chatId =55;
    socketHandler(io, socket, user,chatId);
  });

  socket.on("disconnect", () => {
    console.log("disconnected from chat id", chatId);
    
    memoryGameRoomsReset(socket,chatId);
    console.log("user disconnected");
  });
});
//socket connection-----------------




//who can connect to me and if i can recieve data from the browser
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", useRouter);


// mongoose
//   .connect(process.env.MONGODB_CONNECTION)
//   .then(() => {
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  // })
  // .catch((err) => console.error(err));
