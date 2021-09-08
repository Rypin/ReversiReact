import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {

  componentDidUpdate(prevProps){
    if(this.props.value === '-'){
      return;
    }
    else if(prevProps.value !== this.props.value){
      this.props.update();
    }

  }
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()} disabled={this.props.value}>
          {this.props.value}
        </button>
      );
    }
  }
// class BoardButton extends React.Componenet {
//   constructor(props){
//     super(props);
//     this.settings = {
//       hidden: true,

//     }
//   }
//   render(){
//     <button className="boardButton" onClick ={() => this.props.onClick()} hidden={this.settings.hidden}>
//       {this.settings.text}
//     </button>
//   }
// }
  class Board extends React.Component {

    renderSquare(i) {
      return <Square value = {this.props.squares[i]} 
      onClick={() => this.props.handleClick(i)}
      update = {() => this.props.checkGame()}
      />;
    }
    // handleClick(i){
    //   const squares = this.state.squares.slice();
    //   if(squares[i] === null){
    //     squares[i] = this.state.xTurn ? 'X' : 'O';
        
    //     this.setState({squares:squares, xTurn:!this.state.xTurn, status: ("Next player: " + (this.state.xTurn ? 'O' : 'X'))}); 
    //     this.recordGame(squares);
    //     //reversed bool thing here because i need to see who is next
    //   }
    // }
    // checkGame(){
    //   var lines=[
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    //   ];
    //   for(let i = 0; i < lines.length; i++){
    //     const [a,b,c] = lines[i];
    //     if(this.state.squares[a] != null && this.state.squares[a] === this.state.squares[b]&& this.state.squares[a] === this.state.squares[c])
    //     {
    //       const board = this.state.squares.slice();
          
    //       for(var z = 0; z < 9; z++){
    //         if(board[z] === null)
    //         {
    //           board[z] = '-';
    //         }
    //       }
    //       this.setState({squares:board, status:("Winner: " + (this.state.squares[a])), finished:true});
    //       return this.state.squares[a];
    //     }
    //   }
    //   return 0;
    // }
    resetGame(){
      var sq = Array(9).fill(null);
      this.setState({squares:sq, xTurn:true, status:('Next player: X'), finished: false});
    }
    recordGame(state){
      this.props.recordGameState(state);
    }
    loadGame(state){

    }
    render() {
      
      return (
        <div>
          <div className="status">{this.props.status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div>
          {this.props.finished && <button className="reset" onClick= {() => this.props.resetGame()}>New Game</button>}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [
          {
            squares:Array(9).fill(null)
          }
        ],
        xTurn: true,
        finished: false,
        status: "Next player: X"
      };
    }
    handleClick(i){
      const history = this.state.history;
      const squares = history[history.length-1].squares.slice();
      if(squares[i] === null){
        squares[i] = this.state.xTurn ? 'X' : 'O';
        
        this.setState({history: history.concat([{squares:squares}]), xTurn:!this.state.xTurn, status: ("Next player: " + (this.state.xTurn ? 'O' : 'X'))}); 
        //reversed bool thing here because i need to see who is next
      }
    }
    checkGame(){
      var lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      const history = this.state.history.slice();
      var curState = history[history.length-1].squares.slice();
      console.log(curState);
      for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(curState[a] != null && curState[a] === curState[b]&& curState[a] === curState[c])
        {
          alert("Winner");
          const board = curState.slice();
          
          for(var z = 0; z < 9; z++){
            if(board[z] === null)
            {
              board[z] = '-';
            }
          }
          this.setState({history: history.concat([{squares:board}]), status:("Winner: " + (curState[a])), finished:true});
          return curState[a];
        }
      }
      return 0;
    }
    // recordGame() {
    //   var hist = this.state.history.slice();
    //   hist.push(ChildBoard);
    //   this.setState({history:hist});
    //   console.log(hist);
    // }
    loadGameState(i){
      //cut array down to chosen state
      alert(i);
      console.log(this.state.history.length);
      console.log(this.state.history);
      var hist = this.state.history.slice();
      while(hist.length > i+1){
        hist.pop();
      }
      var turn = (i % 2) === 0;
      console.log(turn);
      this.setState({
        history: hist,
        xTurn: turn,
        status: ("Next player: " + (turn ? 'X' : 'O')),
        finished:false
      })
    }
    newGame(){
      this.setState({
        history: [
          {
            squares:Array(9).fill(null)
          }
        ],
        xTurn: true,
        finished: false,
        status: "Next player: X"
      });
    }
    renderHistory(){
      var board = [];
      var hist = this.state.history.slice();
      for(let i = 1; i < hist.length-1; i++){
            board.push(
              <div onClick={()=> this.loadGameState(i)}>
                <div  className="game-board">
                  <div className="board-row">
                    <div className="square-disable" disabled>
                      {hist[i].squares[0]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[1]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[2]}
                    </div>
                  </div>
                  <div className="board-row">
                    <div className="square-disable" disabled>
                      {hist[i].squares[3]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[4]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[5]}
                    </div>
                  </div>
                  <div className="board-row">
                    <div className="square-disable" disabled>
                      {hist[i].squares[6]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[7]}
                    </div>
                    <div className="square-disable" disabled>
                      {hist[i].squares[8]}
                    </div>
                  </div>
                </div>
              </div>
            );
      }
      return(board);
    }

    render() {
      const history = this.state.history;
      const current = history[history.length-1];
      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} resetGame={()=> this.newGame()} handleClick={(i) => this.handleClick(i)} checkGame={() => this.checkGame()} status = {this.state.status} finished = {this.state.finished}/>
          </div>
          <div className="game-info">
            <div>{this.renderHistory()}</div>
            <ol>{/* TODO */}</ol>
          </div>
          <div className="game-info">
            <div>huh2{/* status */}</div>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  