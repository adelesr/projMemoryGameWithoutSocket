

let rooms = {};

export const memoryGameRoomsReset = (socket,chatId) => {
    console.log("memory game rooms reset started");
    delete rooms[chatId];
    // socket.emit("leaveGameMessage");
}

export const socketHandler = (io, socket, user, chatId) => {
    if (!io || typeof io.to !== 'function') {
        console.error("Invalid io object");
        return;
    }
    const { userName } = user;
    //אם החדר לא במשחק עדיין וזה המשתנה הראשון
    if (!rooms[chatId]) {
    rooms[chatId] = [];
    rooms[chatId].push(user);
    socket.join(chatId);
        console.log("room created");
        console.log("first user added to room, user name: " + userName);  
    }
    else if (rooms[chatId].length === 1 && rooms[chatId][0].userName !== userName) {
        rooms[chatId].push(user);
        socket.join(chatId);        
        console.log("second user added to room, user name: " + userName);
        
        io.to(chatId).emit("playerJoined", ["Game started", rooms[chatId]]);
    } 
    console.log(rooms);
    

    // else if (rooms[chatId].length === 1 && rooms[chatId][0] === userName) {
    // socket.emit("player", "you already in :)"); // Problometic error
    // } 
    // else if (participents.length >= 2) {
    // socket.emit("player", "game is already started");
    // }

    //----------------------------------------------------------------
    socket.on("sendSelectedCards",({card1,card2,turn})=>{
        socket.broadcast.to(chatId).emit("enemyMove",{card1,card2,turn});
      })

    socket.on("gameOver",({player1}, {player2})=>{
         if(player1.score+player2.score==20 )
        {   
            var msg="";
            if(player1.score>player2.score)
            {
               msg=`${player1.userName} is the winner!`;
            }
            else if(player1.score<player2.score)
            {
               msg=`${player2.userName} is the winner!`;
            }
            else {msg="It's a tie! want to play another game?";}
            io.to(chatId).emit("gameOverMessage",msg);
        }
    })
    let countPressedAnotherGame=0;
    socket.on("newGame",()=>{
        countPressedAnotherGame=countPressedAnotherGame+1;
        if(countPressedAnotherGame==2)
        {
            io.to(chatId).emit("anotherGame");
        }
      
    })
    socket.on("leaveGame",()=>{
        io.to(chatId).emit("exitFromGame");
    })
}