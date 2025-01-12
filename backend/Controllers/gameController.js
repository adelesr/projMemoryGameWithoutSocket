

// // import MemoryCard from '../Models/MemoryCards.js';


// const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// export const RenderAndShowArr=()=>{return shuffleArray(cardsArray);}

export const increaseScore=(player)=>{
    player={...player, score:player.score+2}
    return player;
  }
export const gameProccess=()=>{
    
}