import React, { useEffect, useState } from 'react'
import MemoryCard from '../MemoryCard/MemoryCard.jsx';

import './ContainerCardsGame.css';
import { shuffledCardsArray } from '../../assets/memoryCardsArray.js';

const ContainerCardsGame = ({players,cardsArray,msg,wantToLeave}) => {

    const [message, setMessage] = useState(msg);
    //במסך הצאט- אם לוחץ על המשחק המשתנה הופך לTRUE
    const [player1, setPlayer1] = useState({userName:players[0],score:0,inTheGame:true});
    const [player2, setPlayer2] = useState({userName:players[1],score:0,inTheGame:true});
    // const [gameStatus, setGameStatus] = useState('loading');
    // const [cardsArray, setCardsArray] = useState([]); //כל הכרטיסים בלוח
    const [selectedCards, setSelectedCards] = useState([]) //מערך כרטיסים נבחרים
    const [turn, setTurn] = useState(player1);
    const [countOfSelectedCards, setCountSelectedCards] = useState(0);
    const [cardsArr, setCardsArr] = useState(cardsArray);
    const [prevCard, setPrevCard] = useState(-1);

    const increaseScore=() =>{
      if(turn==player1)
          setPlayer1({...player1, score:player1.score+2});
      else {
          setPlayer2({...player2, score:player2.score+2});
        }
    }
    const passTurn=()=>{
      if(turn==player1)
        {setTurn(player2);}
      else {setTurn(player1);}
    }
    const checkGuess=(id)=>{
      if(cardsArr[id].imgSrc== cardsArr[prevCard].imgSrc)
      {
        console.log("correct");
        cardsArr[id].status = 'correct';
        cardsArr[prevCard].status = 'correct';
        setCardsArr([...cardsArr]);
        setPrevCard(-1);
        increaseScore();
        checkWinner();
        passTurn();
      }
      else {
        console.log("wrong");
        cardsArr[id].status = 'wrong';
        cardsArr[prevCard].status = 'wrong';
        setCardsArr([...cardsArr]);
        setTimeout(()=>{
          cardsArr[id].status = "";
          cardsArr[prevCard].status = "";
          setCardsArr([...cardsArr]);
          setPrevCard(-1);
          passTurn();
        },2000)

      }
    }
    const anotherGame=()=>{
        setMessage("");
          setCardsArr(shuffledCardsArray(cardsArr));
          setPrevCard(-1);
          setTurn(player1);
          setCountSelectedCards(0);
    }
    const checkWinner=()=>{
      if(player1.score+player2.score===20)
      {
        if(player1.score>player2.score)
          {
            setMessage(`${player1.userName} is the winner!`);
            console.log("player 1 is the winner");
          }
        else if(player1.score<player2.score)
          {
            setMessage(`${player2.userName} is the winner!`);
            console.log("player 1 is the winner");
          }
        else {setMessage("It's a tie! want to play another game?");}
        setTimeout(()=>{
          setMessage("");
        },5000);
      }
      else{console.log("there isnt winner");
      }
    }
    const handleClick =(id) => {
      console.log(id);
      if(countOfSelectedCards<2)
      {
        console.log("countOfSelectedCards", countOfSelectedCards);
        if(cardsArr[id].status != "correct")
        { 
          if(prevCard===-1)
          {
            cardsArr[id].status = "active";
            setCardsArr([...cardsArr]);
            setPrevCard(id);
            setCountSelectedCards(countOfSelectedCards+1);
            console.log("countOfSelectedCards", countOfSelectedCards);
          }
          else { 
            setCountSelectedCards(countOfSelectedCards+1);
            checkGuess(id)
          }
        }
      }
      if(countOfSelectedCards===2)
      {
        setCountSelectedCards(0);
        checkWinner();
      }
    }
  const classScorsPlayer1= turn===player1? 'greenBorder': 'redBorder';
  const classScorsPlayer2= turn===player2? 'greenBorder': 'redBorder';
  
  return (
    <div className='containerPage'>
       <h1 className='titleMemoryGame'>Memory Game</h1>
       <div className='containerScores'>
          <div className={"detailsUser "+classScorsPlayer1}>
              <h6>Player 1:</h6>
              <h3>{player1.userName}</h3>
              <h3>Score: {player1.score}</h3>
          </div>
          <div className={"detailsUser "+ classScorsPlayer2}>
              <h6>Player 2:</h6>
              <h3> {player2.userName}</h3>
              <h3>Score: {player2.score}</h3>
          </div>
       </div>
        {message?  message.includes("winner") ? (
          <div className={'messageBox '+"winnerMsg"}>
            {message}
            <div>
              <button onClick={()=>anotherGame()}>Another Game</button>
              <button onClick={()=>wantToLeave()}>Leave</button>
            </div>
          </div>): 
            (<div className='messageBox'>{message}</div>): null}
        <div className='gameBoard'>
          {cardsArray.map((card,index) =>(
            <MemoryCard key={index}  memoryCard={card} id={index} onClickCard={handleClick}/>
          ))}
        </div>
    </div>
  )
}

export default ContainerCardsGame