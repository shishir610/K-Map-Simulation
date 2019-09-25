var origBoard;

var cells = document.querySelectorAll('.cell');
var separations = {
    0 : [0],
    1 : [1,2,4,8],
    2 : [3,5,6,9,10,12],
    3 : [7,11,13,14],
    4 : [15]
};

function startGame(){
    origBoard = Array.apply(null, Array(16)).map(function(){return 0});
    for(var i=0;i<cells.length;i++){
        cells[i].innerText = "0";
        cells[i].addEventListener('click',turnClick, false);
    }
}

function turnClick(square){
    turn(square.target.id);
}

function turn(squareId) {
    if (document.getElementById(squareId).innerHTML == 0) {
        origBoard[squareId] = 1;
        document.getElementById(squareId).innerHTML = 1;
    }
    else{
        origBoard[squareId] = 0;
        document.getElementById(squareId).innerHTML = 0;
    }
    for(let i=0;i<cells.length;i++){
        if (origBoard[i] == 1){
            document.getElementById(i).style.color = '#074e6b';
        }
        else{
            document.getElementById(i).style.color = '#2e9bc9';
        }
    }
    GenerateSeparation(origBoard);
}

startGame();

var cur_separations = {0 : [],
    1 : [],
    2 : [],
    3 : [],
    4 : []
};

function GenerateSeparation(o){
    for(let i=0;i<cells.length;i++){
        if (o[i] == 1){
            for(let j=0;j<5;j++){
                if (separations[j].includes(i)){
                    cur_separations[j].push(i);
                }
            }
        }
    }
}
