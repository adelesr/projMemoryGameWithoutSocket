import express from "express";
import cors from "cors";
import { config } from "dotenv";
// import mongoose from "mongoose";
import useRouter from "./Routers/useRouter.js";
import http from "http";
import { Server } from "socket.io";
import { increaseScore } from "./Controllers/gameController.js";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, { cors: "*" });
config();
const PORT = process.env.PORT || 8080;

let participents = [];
let rooms = {};
io.on("connection", (socket) => {
 
  socket.on("joinGame", ({user,chatId}) => {
    const { userName } = user;
    console.log(userName);

    if (!rooms[chatId]) {
      console.log("adding room"+chatId);
      rooms[chatId] = [];
    }
    console.log("connected","particip:"+rooms[chatId].length);

    if (rooms[chatId].length === 0) {
      //אם החדר לא במשחק עדיין וזה המשתנה הראשון
      rooms[chatId].push(userName);
      socket.join(chatId);
      socket.emit("playerJoined", ["",rooms[chatId]]);
    } 

    //אם החדר קיים והמשתנה השני נכנס
    else if (rooms[chatId].length === 1 && rooms[chatId][0] !== userName) {
      console.log("enter to if 2");

      socket.join(chatId);
      rooms[chatId].push(userName);
    
      console.log(userName, "Joined room 2" + "room: "+chatId);
      io.to(chatId).emit("playerJoined", ["Game started", rooms[chatId]]);
      
      //  io.sockets.emit("player", ["game started",rooms[chatId]]);
    } 
    else if (rooms[chatId].length === 1 && rooms[chatId][0] === userName) {
      console.log( "if 3");
      socket.emit("playerJoined", ["you already in :)",[]]); // Problometic error
    } 
    else if (rooms[chatId].length >= 2) {
      console.log( "if 3");
      console.log(userName, "room is full");
      socket.emit("playerJoined", ["game is already started",null]);
    }
  });
  // socket.on("playerClicked",(card1,prevCard,turn)=>{      
  //   if((card1.imgSrc== prevCard.imgSrc)&& (card1.id!=prevCard.id))
  //     {
  //       console.log("correct");
  //       card1.status = 'correct';
  //       prevCard.status = 'correct';
  //       player=increaseScore(turn); //מחזיר את השחקן עם תוספת ניקוד
  //       io.to(chatId).emit("playerCorrect", [card1,prevCard,player]);
  // }})
});
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
