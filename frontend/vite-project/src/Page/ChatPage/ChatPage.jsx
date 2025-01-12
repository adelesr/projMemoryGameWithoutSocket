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


    const movingGame= (user,chatId) => {
        console.log(user)
        
       
        //   const message=msgAndPlayers[0];
        //   const participants=msgAndPlayers[1]||[];
        //   console.log(message,"room: "+chatId);
        //   navigate("/memory-game", { state: { message, participants,chatId } })

          navigate("/memory-game", { state: { user,chatId} })
          socket.on('disconnect',()=>{console.log('User disconnected');})

        }
        const roomNum=1;
        const chatId=roomNum+1;
      //)

   
  return (
    <div>
        <button onClick={()=>movingGame(userOne,chatId)}>MemoryGame - User One</button>
        <button onClick={()=>movingGame(userTwo,chatId)}>MemoryGame</button>
    </div>
  )
}
export default ChatPage