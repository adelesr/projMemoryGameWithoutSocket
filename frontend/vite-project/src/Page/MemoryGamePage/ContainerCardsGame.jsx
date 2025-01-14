import React, { useEffect, useState } from 'react'
import MemoryCard from '../MemoryCard/MemoryCard.jsx';

import './ContainerCardsGame.css';

const ContainerCardsGame = ({players,cards,wantToLeave}) => {

  const [winningMessage, setWinningMessage] = useState("");
  //במסך הצאט- אם לוחץ על המשחק המשתנה הופך לTRUE
  const [player1, setPlayer1] = useState({userName:players[0],score:0,inTheGame:true});
  const [player2, setPlayer2] = useState({userName:players[1],score:0,inTheGame:true});

  const [turn, setTurn] = useState(player1);
  const [countOfSelectedCards, setCountSelectedCards] = useState(0);
  const [cardsArr, setCardsArr] = useState(cards); //כל הכרטיסים בלוח
  const [prevCard, setPrevCard] = useState(null); //כרטיס קודם שנבחר

  const increaseScore=() =>{
    if(turn==player1)
        setPlayer1({...player1, score:player1.score+2});
    else {
        setPlayer2({...player2, score:player2.score+2});
      }
  }
  const checkGuesses=(card1Index,card2Index )=>{
    if(cardsArr[card1Index].imgSrc == cardsArr[card2Index].imgSrc)
    {
      cardsArr[card1Index].status =  'active correct';
      cardsArr[card2Index].status = 'active correct';
      // cardsArr[card1Index].status = 'correct';
      // cardsArr[card2Index].status = 'correct';
      increaseScore();
      checkWinner();
      setCardsArr(cardsArr);
      //--- until here in thw server
    }
    else {
      const newCardsArr = [...cardsArr];
      newCardsArr[card1Index].status = 'active wrong';
      newCardsArr[card2Index].status = 'active wrong';
      setCardsArr(newCardsArr);
      setTimeout(()=>{
        const resetCardsArr = [...newCardsArr];
        resetCardsArr[card1Index].status = "";
        resetCardsArr[card2Index].status = "";
        setCardsArr(resetCardsArr);
      },2000)      
    }
    setPrevCard(null);
    setTurn(turn==player1 ? player2:player1);
  }
  // const anotherGame=()=>{
  //   setWinningMessage("");
  //       setCardsArr(shuffledCardsArray(cardsArr));
  //       setPrevCard(-1);
  //       setTurn(player1);
  //       setCountSelectedCards(0);
  // }
  const checkWinner=()=>{
    if(player1.score+player2.score==20)
    {
      if(player1.score>player2.score)
        {
          setWinningMessage(`${player1.userName} is the winner!`);
        }
      else if(player1.score<player2.score)
        {
          setWinningMessage(`${player2.userName} is the winner!`);
        }
      else {setWinningMessage("It's a tie! want to play another game?");}
      setTimeout(()=>{
        setWinningMessage("");
      },5000);
    }
    else{console.log("there isnt winner");
    }
  }
  const handleClick =(indexCard) => {
    console.log("cardClicked method invoked - ", cardsArr[indexCard]);
    
    //אם נבחרו פחות משני קלפים והקלף שנבחר אינו זהה לקלף הקודם
    if( (countOfSelectedCards<2) && (cardsArr[indexCard].id!==prevCard))
    {
      //אם הקלף שנבחר פנוי ולא מכיל בסטטוס את המילה נכון
      if(!cardsArr[indexCard].status.includes("correct"))
      { 
        cardsArr[indexCard].status = "active";
        setCardsArr([...cardsArr]);
        setCountSelectedCards(countOfSelectedCards+1);

        if(!prevCard) //אם זה הקלף הראשון שנבחר
        {
          setPrevCard(cardsArr[indexCard].id);
        }
        else { 
          checkGuesses(indexCard,cardsArr.findIndex((c)=>c.id == prevCard) );
          setCountSelectedCards(0);
        }
      }
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

        {winningMessage ? (
          <div className={'messageBox '+"winnerMsg"}>
            {winningMessage}
            <div>
              <button onClick={()=>anotherGame()}>Another Game</button>
              <button onClick={()=>wantToLeave()}>Leave</button>
            </div>
          </div>):   null}
          


        <div className='gameBoard'>
          {cardsArr.map((card,index) =>(
            <MemoryCard key={index} currentCard={card} indexCard={index} onClickCard={handleClick}/>
          ))}
        </div>
    </div>
  )
}

export default ContainerCardsGame