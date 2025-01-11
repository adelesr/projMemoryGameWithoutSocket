import React, { useState } from 'react'
const MemoryCard = ({memoryCard,id,onClickCard}) => {
  const {imgSrc} = memoryCard;
  // const [isSelected, setIsSelected] = useState(memoryCard.isSelected);

  const cardClass= memoryCard.status ? "active "+ memoryCard.status : ""; 
  return (
    <div className={'card '+ cardClass}  onClick={()=>onClickCard(id)} >
       {cardClass.includes("active") ? (<img src={"../src/assets/Images/cardsImg/"+`${imgSrc}`} alt="memory card" className='img' />):('') }
    </div>

    //style={{borderColor: memoryCard.isSelected ? 'green': 'black'}}
    //        {memoryCard.status==="active" ? (<img src={"../src/assets/Images/cardsImg/"+`${imgSrc}`} alt="memory card" className='img' />) :('') }

  )
}

export default MemoryCard