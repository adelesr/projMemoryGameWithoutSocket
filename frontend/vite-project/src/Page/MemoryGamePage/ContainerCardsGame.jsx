import React from 'react'


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const ContainerCardsGame = ({players}) => {

    const [message, setMessage] = useState('');
    //במסך הצאט- אם לוחץ על המשחק המשתנה הופך לTRUE
    const [player1, setPlayer1] = useState({userName:players[0],score:0,inTheGame:true});
    const [player2, setPlayer2] = useState({userName:players[1],score:0,inTheGame:true});
    // const [gameStatus, setGameStatus] = useState('loading');
    const [cardsArray, setCardsArray] = useState([]); //כל הכרטיסים בלוח
    const [selectedCards, setSelectedCards] = useState([]) //מערך כרטיסים נבחרים
    const [turn, setTurn] = useState(player1);
    useEffect(() =>{
        socket.on('gameStart', (msg,memoryCardsArray) => {
            setCardsArray(memoryCardsArray);
            setGameStatus('in-game');
            setMessage(msg+`\n ${player1.userName} vs ${player2.userName}`);
            
          });
    });
  return (
    <div>

    </div>
  )
}

export default ContainerCardsGame