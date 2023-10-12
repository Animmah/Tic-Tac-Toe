import './App.css';
import React,{useState} from 'react';
const Square=({value,onSquareClick})=>{
  return (
    <button className="square-button" onClick={onSquareClick} >{value}</button>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function Board({xIsSet,onPlay,squares}) {
  
  let winner="";
  const handleClick=(index)=>{
    let arr=squares.slice();
    if(arr[index]||calculateWinner(squares)){
      return ;
    }
    if(xIsSet)
      arr[index]='X';
    else
      arr[index]='O';
    onPlay(arr);
  }
  let foundWinner=calculateWinner(squares);
  if(foundWinner){
    winner=("Winner is: "+foundWinner);
  }
  else{
    winner=("Current player: "+(xIsSet?'X':'O'));
  }
  return (
    <>
      <div>{winner}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game(){
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const xIsSet=(currentMove%2===0);
  const currState=history[currentMove];

  function handleOnPlay(newArr){
    
    const nextHistory = [...history.slice(0,currentMove + 1), newArr];
    setHistory(nextHistory);    
    setCurrentMove(nextHistory.length-1);
  }
  const jumpTo=(move)=>{
    setCurrentMove(move);
  }
  const moves=history.map((squares,move)=>{
    let description;
    if(move>0)description="Move number "+move;
    else description="Empty game";
    return (
      <div key={move} >
        <button onClick={()=>jumpTo(move)} >{description}</button>
      </div>
    );
  });
  return <>
    <div className="board">
      <Board xIsSet={xIsSet} onPlay={handleOnPlay} squares={currState}/>
    </div>
    <div className="display-table">{moves}</div>
  </>
}