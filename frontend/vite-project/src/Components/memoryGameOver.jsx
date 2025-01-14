import React from 'react'

const memoryGameOver = (msgResult,anotherGame,leaveGame) => {

  return (
    <div className='victoryImg'>
         <div className={'messageBox '+"winnerMsg"}>
            {msgResult}
            <div>
                <button onClick={()=>anotherGame}>Another Game</button>
                <button onClick={()=>leaveGame}>Leave</button>
            </div>
        </div>
    </div>
  )
}

export default memoryGameOver