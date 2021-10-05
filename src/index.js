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
        <button className="square" onClick={() => this.props.onClick()} key={this.props.col} disabled={this.props.value}>
          {this.props.value}
        </button>
      );
    }
  }

  class Board extends React.Component {

    renderSquare(x, y) {
      // var disabled = true;
      // var moves = this.props.moves;
      // for(var i = 0; i < moves.length; i++){
      //   var a, b = this.props.moves[i];
      //   if(a === x && b === y){
      //       disabled = false;
      //   }
      // }
      return <Square value = {this.props.board[x][y]} 
      onClick={() => this.props.handleClick(x, y)}
      update = {() => this.props.checkGame()}
      col = {(x +"sq"+y)} 
      disabled = {disabled}
      />;
    }
    render() {
      const board = this.props.board;
      console.log(board);
      const board_render = board.map((line, row) =>      
          <div className="board-row" key ={"row"+row}>{line.map((square, col)=>
            this.renderSquare(row,col)
          )}</div>
      );
      return (
        <div>
          <div className="status">{this.props.status}</div>
          {board_render}
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
            squares:[
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,'X','O',null,null,null],
              [null,null,null,'O','X',null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null]
            ]
          }
        ],
        xTurn: true,
        finished: false,
        status: "Next player: X",
        player:[
          {
            A:{moves:[],pieces:[[3,3], [4,4]]},
            B:{moves:[],pieces:[[3,4],[4,3]]}
          }
        ]
      };
      this.getMoves = this.getMoves.bind(this);
    }
    handleClick(i, j){
      const history = this.state.history;
      const squares = history[history.length-1].squares.slice();
      if(squares[i][j] === null){
        squares[i][j] = this.state.xTurn ? 'X' : 'O';
        
        this.setState({history: history.concat([{squares:squares}]), xTurn:!this.state.xTurn, status: ("Next player: " + (this.state.xTurn ? 'O' : 'X'))}); 
        //reversed bool thing here because i need to see who is next
      }
    }
    getPieces(){
      const history = this.state.history;
      const board = history[history.length-1].squares;
      var player = this.state.xTurn? 'X': 'O';
      var foundPieces = [];
// eslint-disable-next-line
      board.map((line, row) =>  
      // eslint-disable-next-line
                  line.map((square, col) => 
                    {
                      if(square === player)
                      {foundPieces.push([row,col])}
                    }));
      return foundPieces;
    }
    getMoves(){
      const history = this.state.history;
      const current = history[history.length-1];
      const board = current.squares;
      // var pieces = this.state.xTurn? this.state.player.A.pieces.slice(): this.state.player.B.pieces.slice();
      const pieces = this.getPieces();
      const boardSize = board.length;
      const oppPlayer = this.state.xTurn? 'O':'X';
      const foundMoves = []
      for(let i =0; i < pieces.length; i++){
        var [a,b] = pieces[i]
        var flag = false;
        for(let x = a; x < boardSize; x++){
          
          if(board[x][b] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][b] === oppPlayer){
            flag = true;
          }
        }
        for(let x = a; x > -1; x--){
          if(board[x][b] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][b] === oppPlayer){
            flag = true;
          }
        }
        for(let x = a, y = b; x < boardSize && y < boardSize; x++, y++){
          if(board[x][y] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][y]=== oppPlayer){
            flag = true;
          }
        }
        for(let x = a, y = b; x > -1 && y > -1; x--, y--){
          if(board[x][y] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][y]=== oppPlayer){
            flag = true;
          }
        }
        for(let x = a, y = b;  x > -1 && y < boardSize; x--, y++){
          if(board[x][y] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][y]=== oppPlayer){
            flag = true;
          }
        }
        for(let x = a, y = b; x < boardSize && y>-1; x++, y--){
          if(board[x][y] === null){
            if(flag)
            {
              foundMoves.push([x,b]);
              flag=false;
            }
            break;
          }
          if(board[x][y]=== oppPlayer){
            flag = true;
          }
        }
        for(let y = b; y < boardSize; y++){
          
          if(board[a][y] === null){
            if(flag)
            {
              foundMoves.push([a,y]);
              flag=false;
            }
            break;
          }
          if(board[a][y] === oppPlayer){
            flag = true;
          }
        }
        for(let y = b; y>-1; y--){
          if(board[a][y] === null){
            if(flag)
            {
              foundMoves.push([a,y]);
              flag=false;
            }
            break;
          }
          if(board[a][y] === oppPlayer){
            flag = true;
          }
        }
      }
      console.log(foundMoves);
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
            squares:[
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,'X','O',null,null,null],
              [null,null,null,'O','X',null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null]
            ]
          }
        ],
        xTurn: true,
        finished: false,
        status: "Next player: X"
      });
    }
    renderHistory(){
      var hist = this.state.history.slice();
      hist.shift();
      var oldBoards = this.state.history.slice(1);
      console.log(oldBoards);
          var history = oldBoards.map((board, index)=>
            <div className="game-board" key={index} onClick={()=> this.loadGameState(index)}>
              {
                board.squares.map((row, i)=>
                  <div className="board-row">
                  {
                    row.map((
                      square, col
                    )=>  <button className="square" disabled={true}>
                            {square}
                          </button>
                    )
                  }
                  </div>
                )
              }
            </div>
          );
      
      return(history);
    }

    render() {
      const history = this.state.history;
      const current = history[history.length-1];
      const moves = this.getMoves();
      return (
        <div className="game">
          <div className="game-board">
            <Board board = {current.squares} moves = {moves} resetGame={()=> this.newGame()} handleClick={(i,j) => this.handleClick(i,j)} checkGame={() => this.checkGame()} status = {this.state.status} finished = {this.state.finished}/>
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
  