import { useEffect, useState } from 'react'
import './App.css'
import Confetti from 'react-confetti'

//need to add win functionality

function App() {
  const [win , setWin] = useState(false)
  const [currPlayer,setCurrPlayer] = useState('x')
  const [table, setTable] = useState(setGame())

  useEffect(() => {
    checkForWin()
  },[table])

  function setGame(){
    const tempArr = []
    for (let index = 0; index < 9; index++) {
      let sqare = {
        id: index , value: ''
      }

      tempArr.push(sqare)
    }
    return tempArr
  }

  function playerSwap(){
    setCurrPlayer((curPl) => {
      if(curPl === 'x'){
        return 'o'
      }
      else {
        return 'x'
      }
    })
  }
  
  function handleSqareClick(sqare){
    if (!sqare.value && !win) {
      const tempArr = []
      for (let index = 0; index < 9; index++) {
        let newSqare = {}
        if (sqare.id === table[index].id) {
          newSqare = {
            id: table[index].id,
            value: currPlayer
          }
        }
        else {
          newSqare = table[index]
        }
        tempArr.push(newSqare)
        playerSwap()
      }
      setTable(tempArr)
    }
  }

  function checkForWin() {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
  
    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      const valueA = table[a].value;
      const valueB = table[b].value;
      const valueC = table[c].value;
  
      if (valueA && valueA === valueB && valueA === valueC) {
        playerSwap()
        setWin(true);
        return;
      }
    }
  }

  function handleBtnClick(){
    setTable(setGame())
    setWin(false)
  }

  return (
    <div className='display'>
      {win && <Confetti gravity={0.7}/>}
      {win ? <div className='notification'>{currPlayer} won !</div> : <div className='notification'>Turn of player {currPlayer}</div>}
      <div className='container'>
        {table.map((element) => {
          return (
            <div onClick={() => handleSqareClick(element)} key={element.id} className='sqare'>{element.value}</div>
          )
        })}
      </div>
      {win && <button className='button' onClick={handleBtnClick}>PLAY AGAIN</button>}
    </div>
  )
}

export default App
