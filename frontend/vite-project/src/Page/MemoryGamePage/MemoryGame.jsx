import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { socket } from '../../../utils/socket.js';
import ContainerCardsGame from './ContainerCardsGame.jsx';
import { shuffledCardsArray } from '../../assets/memoryCardsArray.js';
import '../MemoryCard/MemoryCard.css';
import '../MemoryGamePage/MemoryGame.css'
const MemoryGamePage = () => {
  const navigate=useNavigate();
  const {state} = useLocation();
  let {user} = state;
  const [messageShow, setMessageShow] = useState("");
  const [participantsArr, setParticipantsArr] = useState([]);
  const [memoryCardsArr, setMemoryCardsArr] = useState(shuffledCardsArray);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on('playerJoined',(arr) => {
      const message=arr[0]
      const participents=arr[1];
      setMessageShow(message);
      setParticipantsArr(participents);
      setIsLoading(false);
    });
    // socket.emit("joinGame",{user,chatId});
    socket.emit("joinGame",user);
    return () => {
      socket.off('playerJoined');
    }
  }, []);
  // const userLeave=()=>{
    //   socket.emit("leaveGame"); //לעשות סוקט אוף לJoinGame
    //   socket.on("leaveGameMessage",()=>{
      //     setMessageShow("left the game");
      //     navigate("/chat");
      //     setTimeout(setMessageShow(""),3000);
      //   })
      // }
      const sameUsersPlayTwice=()=>{
        socket.on('playerJoined',(arr) => {
          const message=arr[0]
          const participents=arr[1];
          setMessageShow(message);
          setParticipantsArr(participents);
          setMemoryCardsArr(shuffledCardsArray);
          setIsLoading(false);
        });
        // socket.emit("joinGame",{user,chatId});
        socket.emit("joinGame",user);
        return () => {
          socket.off('playerJoined');
        }
      }
  return (
    <div>
       { isLoading ? 
        ( <div className='gamePage'>
            <Spinner animation="border" variant="info" className='spinner'/>
          </div> ) :

         ( messageShow==="Game started" ?
           (<div>
                <div className="msgGame hideMessage">
                  {messageShow}
                </div>
                  <div className='MemoryGamePage'>
                      <ContainerCardsGame players={participantsArr} wantToLeave={""} sameUsersPlayTwice={sameUsersPlayTwice} cards={memoryCardsArr} currentUser={user}/>
                  </div>
            </div> )
           : 
            ( <div className="msgGame hideMessage">{messageShow}</div>)
          )

      }  
    </div>
   
)

}
export default MemoryGamePage


