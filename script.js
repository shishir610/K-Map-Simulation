var origBoard;

var cells = document.getElementsByClassName('cell');
console.log(cells.length);

function startGame(){
    origBoard = Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++){
        cells[i].innerText = "";
        cells[i].addEventListener('click',turnClick, false);
    }
}

function turnClick(square){
    console.log(square.target.id);
}
startGame();