import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { socket } from '../../../utils/socket.js';
import ContainerCardsGame from './ContainerCardsGame.jsx';
import { shuffledCardsArray } from '../../assets/memoryCardsArray.js';
import '../MemoryCard/MemoryCard.css';
import '../MemoryGamePage/MemoryGame.css';
const MemoryGamePage = () => {
  const navigate=useNavigate();
  const {state} = useLocation();
  // var {participants , message,chatId} = state;
  var {user,chatId} = state;
  const [messageShow, setMessageShow] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [participantsArr, setParticipantsArr] = useState([]);

  // const [memoryCardsArr, setMemoryCardsArr] = useState([]);

  useEffect(() => {
   
    socket.on("playerJoined",(msgAndPlayers)=>{

      setMessageShow(msgAndPlayers[0]);
      console.log("msgShow:", messageShow);
      console.log(msgAndPlayers[0]);
      setParticipantsArr(msgAndPlayers[1]);
      console.log(msgAndPlayers[1]);

   })
   socket.emit("joinGame",{user,chatId});
    
    
    console.log(user+"1111")
  
    // socket.on("playerJoined",(msgAndPlayers)=>{
    //   socket.emit
    //     console.log("msg:", msgAndPlayers[0]);
    //     setMessageShow( msgAndPlayers[0] ); //nessage
    //     setParticipantsArr( msgAndPlayers[1] ); //participants
     
      // } )
    return () => {
          socket.off("playerJoined" )
        }
  }, []);

  useEffect(() => {
    if(messageShow==="Game started"){
      setIsLoading(false);
      console.log(isLoading);
     }
  }, [messageShow]);
  
  const userLeave=()=>{
    socket.emit("leaveGame"); //לעשות סוקט אוף לJoinGame
    socket.on("leaveGameMessage",()=>{
      setMessageShow("left the game");
      navigate("/chat");
      setTimeout(() => setMessageShow(""), 3000);
    });
  }
  // const gameShow =()=>{
  //   setTimeout(() => {
  //     console.log("disappear!");
  //     setMessageShow(""); // Hide the message after 3 seconds
  //   }, 3000);
  //   console.log(messageShow,"cardArray: "+memoryCardsArr)
  // } 

  return (
    <div>
      {/* messageShow=="Waiting for the other player to join" */}
    { isLoading ? 
        ( <div className='gamePage'>
            {/* Waiting for the other player to join... */}
            <Spinner animation="border" variant="info" className='spinner'/>
          </div> ) :

         ( messageShow==="Game started" ? (
          <div>
              <div className="msgGame hideMessage">
                {messageShow}
              </div>
              
                <div className='MemoryGamePage'>
                    <ContainerCardsGame players={participantsArr} wantToLeave={userLeave} cardsArray={shuffledCardsArray}/>
                </div>
          </div> ) : 

            ( <div className="msgGame">{messageShow}</div>)
          )

    }  

   </div>


    // <div className='MemoryGamePage'>
    //   {/* <button onClick={userLeave()}>Leave the game</button> */}
    //  <ContainerCardsGame players={participantsArr} wantToLeave={userLeave} cardsArray={shuffledCardsArray}/>
    // </div>
)
}

export default MemoryGamePage


  