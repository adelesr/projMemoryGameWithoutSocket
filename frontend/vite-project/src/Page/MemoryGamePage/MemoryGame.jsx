import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { socket } from '../../../utils/socket.js';
import ContainerCardsGame from './ContainerCardsGame.jsx';
import { shuffledCardsArray } from '../../assets/memoryCardsArray.js';
import '../MemoryCard/MemoryCard.css';
const MemoryGamePage = () => {
  const navigate=useNavigate();
  // const {state} = useLocation();
  // var {user , message} = state;
  const [messageShow, setMessageShow] = useState("");
  const [participantsArr, setParticipantsArr] = useState([]);
  const [memoryCardsArr, setMemoryCardsArr] = useState([]);
  useEffect(() => {
    socket.on('player',(arr) => {
      const message=arr[0]
      const participents=arr[1];
      // const memoryCards=arr[2];
      // console.log(memoryCards);
      setMessageShow(message);
      setParticipantsArr(participents);
      // setMemoryCardsArr(memoryCards);
      // console.log(memoryCards);
      });
  }, []);
  const userLeave=()=>{
    socket.emit("leaveGame"); //לעשות סוקט אוף לJoinGame
    socket.on("leaveGameMessage",()=>{
      setMessageShow("left the game");
      navigate("/chat");
      setTimeout(setMessageShow(""),3000);
    })
  }
  // const gameShow = setTimeout(() => {
  //   console.log("disappear!");
  //   setMessageShow(""); // Hide the message after 3 seconds
  // }, 3000);
  console.log(messageShow,"cardArray: "+memoryCardsArr)

  return (
    <div className='MemoryGamePage'>
      {/* <button onClick={userLeave()}>Leave the game</button> */}
     <ContainerCardsGame players={participantsArr} wantToLeave={userLeave} cardsArray={shuffledCardsArray}/>
    </div>
)
}

export default MemoryGamePage


    // <div>
      {/* {console.log(messageShow)} */}
      {/* {messageShow=="Waiting for the other player to join" ? (
         
        <div className="msgGame">
          {messageShow}
          <Spinner animation="border" variant="info" />
        </div>)
        : (messageShow=="game started" ? (
            <div className="msgGame">
              {messageShow}
              <div> <ContainerCardsGame players={participantsArr} cardsArray={memoryCardsArr}/></div>
          {/* {gameShow} */}
    //         </div>
    //           )
    //           : 
    //           (<div className="msgGame">{messageShow}</div>))

    //   } */}

    // </div>