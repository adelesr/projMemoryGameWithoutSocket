import React, { useState } from 'react'
import { socket } from '../../../utils/socket.js'
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const navigate=useNavigate();
   // const [message, setMessage] = useState("waiting for the other player to join");

    let TempMessage = "0";
    const userOne={ 
    id:1,
    userName: "adelesr",
    email:"adelesr77@gmail.com",
    isFemale:true};

    const userTwo={ 
    id:2,
    userName: "pizza",
    email:"adelesr77@gmail.com",
    isFemale:true};

    const movingGame= (user) => {
      console.log(user)
        navigate("/memory-game", { state: { user } })
    }
    
  return (
    <div>
        <button onClick={()=>movingGame(userOne)}>MemoryGame - User One</button>
        <button onClick={()=>movingGame(userTwo)}>MemoryGame</button>
    </div>
    
  )
}

export default ChatPage