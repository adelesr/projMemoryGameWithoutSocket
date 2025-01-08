import React, { useState } from 'react'
import { socket } from '../../../utils/socket.js'
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const navigate=useNavigate();
   // const [message, setMessage] = useState("waiting for the other player to join");

    let TempMessage = "0";
    const userOne={ userName: "adelesr",
    password:"12345678a!",
    email:"adelesr77@gmail.com",
    isFemale:true};

    const userTwo={ userName: "pizza",
      password:"12345678a!",
      email:"adelesr77@gmail.com",
      isFemale:true};

    const movingGame= (user) => {
        console.log(user)
        socket.emit("joinGame",user);
        socket.on("player",(message)=>{
          console.log(message);
            navigate("/memory-game", { state: { message, user } })
        })
        socket.on('disconnect',()=>
        console.log('User disconnected'));
    }
    
  return (
    <div>
        <button onClick={()=>movingGame(userOne)}>MemoryGame - User One</button>
        <button onClick={()=>movingGame(userTwo)}>MemoryGame</button>
    </div>
    
  )
}

export default ChatPage