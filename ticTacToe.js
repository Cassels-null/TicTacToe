//written in javascript
//to be run in console

//type   newGame()   to begin
//to place a tick, type   a(x,y)   where x and y are the cordinates you wish to play


//initialize variables and function abbriviations
var board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];
var player = "x";
var turn = 1;
var a = placeTick;
var consecutiveTies = 0;

function newGame(){//reset everything and start a new game
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    player = "x";
    turn = 1;
    render();
}

function render(message = ""){ //displayes current board in console, can accept a message to display
    console.clear();
    console.log(message);
    console.log("current turn: " + player);
    console.log("turn: " + turn);
    console.log(" "+board[0][0]+" | "+board[0][1]+" | "+board[0][2]+" ");
    console.log("---+---+---");
    console.log(" "+board[1][0]+" | "+board[1][1]+" | "+board[1][2]+" ");
    console.log("---+---+---");
    console.log(" "+board[2][0]+" | "+board[2][1]+" | "+board[2][2]+" ");
}

function placeTick(x,y){ //place the current player's tick in an empty square, then go to next turn
    if(board[y][x] === " "){
        board[y][x] = player;
        if(winningMove(x,y) === true){//did someone win the game?
            splash(player);
        }else if(turn === 9){//is the game a tie?
            splash("tie");
        } else {
        togglePlayer();//next turn
        render();
        }
    } else{
        render("square not empty");
    }
}

function togglePlayer(){//changes current player
    if(player === "x"){
        player = "o";
    } else{
        player = "x";
    }
    turn++;
}

function splash(winner = null){
    if (winner === "tie"){
        if(consecutiveTies < 10){//will break the progam's flow if false, set to true if you want allow a long string of uninurupted remaches, or if you don't like the movie War Games.
        consecutiveTies += 1;
        render("the game is a tie!");
        } else {
            console.clear()
            console.log("A STRANGE GAME, THE ONLY WINNING MOVE IS NOT TO PLAY")
        }
    } else if (winner != null){
        render("congratulations! "+ winner +" won the game!");
        consecutiveTies = 0;
    }
    playAgain();
}

function playAgain(){//prompt the player for a new game
    var again = prompt("WOULD YOU LIKE TO PLAY A GAME?");
    if((again === "Y") || (again === "y") || (again === "yes") || (again === "Yes") || (again === "YES") || (again === "")){
        newGame();
    } else{
        console.clear();
        console.log("HOW ABOUT A NICE GAME OF CHESS?");
    }
}

function winningMove(x,y){//input the x and y location of a peice that was just played, return a bool or weather or not that tick makes 3-in-a-row in any dimension.
    var win = false;
    if(countRow(x,y)[0] === 3){
        win = true;
    }
    if(countLine(x,y)[0] === 3){
        win = true;
    }
    if(countLeftDiagonal(x,y)[0] === 3){
        win = true;
    }
    if(countRightDiagonal(x,y)[0] === 3){
        win = true;
    }
    return win;
}

//all of the following functions count the ticks in a stripe of 3 squares
//input the x and y loaction of a square and a player(defalut: current player), return a tuple of [player's ticks, opponts's ticks]

function countRow(x, y, tick = player){
    var output = [0,0];
    for(var i = 0; i < 3; i++){
        var square = board[y][i];
        if(square != " "){
            if(square === tick){
                output[0] += 1;
            } else{
                output[1] += 1;
            }
        }
    }
    return output;
}

function countLine(x, y, tick = player){
    var output = [0,0];
    for(var i = 0; i < 3; i++){
        var square = board[i][x];
        if(square != " "){
            if(square === tick){
                output[0] += 1;
            } else{
                output[1] += 1;
            }
        }
    }
    return output;
}

function countLeftDiagonal(x, y, tick = player){
    var output = [0,0];
    if((x === 1 || y === 1) && (x != y )){
        return output;
    };
    for(var i = 0; i < 3; i++){
        var square = board[i][i];
        if(square != " "){
            if(square === tick){
                output[0] += 1;
            } else{
                output[1] += 1;
            }
        }
    }
    return output;
}

function countRightDiagonal(x, y, tick = player){
    var output = [0,0];
    if((x === 1 || y === 1) && (x != y )){
        return output;
    };
    for(var i = 0; i < 3; i++){
        var square = board[2-i][i];
        if(square != " "){
            if(square === tick){
                output[0] += 1;
            } else{
                output[1] += 1;
            }
        }
    }
    return output;
}