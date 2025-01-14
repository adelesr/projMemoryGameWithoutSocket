

let rooms = {};

export const memoryGameRoomsReset = (socket,chatId) => {
    console.log("memory game rooms reset started");
    delete rooms[chatId];
    // socket.emit("leaveGameMessage");
    console.log("memory game rooms reset ended");
}

export const socketHandler = (io, socket, user, chatId) => {
    if (!io || typeof io.to !== 'function') {
        console.error("Invalid io object");
        return;
    }
    const { userName } = user;
    console.log("memory socket handler started by socket num =  " + socket.id);
    
    //אם החדר לא במשחק עדיין וזה המשתנה הראשון
    if (!rooms[chatId]) {
    rooms[chatId] = [];
    rooms[chatId].push(userName);
    socket.join(chatId);
        console.log("room created");
        console.log("first user added to room, user name: " + userName);  
    }else if (rooms[chatId].length === 1 && rooms[chatId][0] !== userName) {
        rooms[chatId].push(userName);
        socket.join(chatId);        
        console.log("second user added to room, user name: " + userName);
        
        io.to(chatId).emit("playerJoined", ["Game started", rooms[chatId]]);


        // io.to(chatId).emit("playerJoined", ["Game started", rooms[chatId]]);
    } 
    console.log(rooms);
    

    // else if (rooms[chatId].length === 1 && rooms[chatId][0] === userName) {
    // socket.emit("player", "you already in :)"); // Problometic error
    // } 
    // else if (participents.length >= 2) {
    // socket.emit("player", "game is already started");
    // }

    //----------------------------------------------------------------

}