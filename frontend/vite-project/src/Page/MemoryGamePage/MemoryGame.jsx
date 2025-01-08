import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import { socket } from '../../../utils/socket.js';
const MemoryGamePage = () => {
  const {state} = useLocation();
  var {user , message} = state;
  const [messageShow, setMessageShow] = useState(message);
  const [participantsArr, setParticipantsArr] = useState([])
  useEffect(() => {
    socket.on('player',(msg,participents) => {
      setMessageShow(msg);
      setParticipantsArr(participents);
      });
  }, []);
  
    const gameShow = setTimeout(() => {
      console.log("disappear!");
      setMessageShow(""); // Hide the message after 3 seconds
    }, 3000);
  
  return (
    <div>
      <h1>Memory Game Page</h1>
      {console.log(messageShow)}

      {messageShow=="Waiting for the other player to join" ? (
          <div className="msgGame">
            {messageShow}!
            <Spinner animation="border" variant="info" />
          </div>) : (messageShow=="game started" ? (
                 <div className="msgGame">
                  {messageShow}
                  {gameShow}
                  <ContainerCardsGameCard players={participantsArr} />
                 </div>
              ) : (<div className="msgGame">{messageShow}</div>))
          
          
       

    }

    </div>
  )
}

export default MemoryGamePage
