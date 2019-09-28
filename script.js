//!KMAP!

var origBoard;
var cells = document.querySelectorAll('.cell');
var separations = {
    0 : [0],
    1 : [1,2,4,8],
    2 : [3,5,6,9,10,12],
    3 : [7,11,13,14],
    4 : [15]
    /*
    0 : 0, 1 : 1, 2 : 1, 3 : 2, 4 : 1,
    5 : 2,          //Alternative to the current implementation
    6 : 2,
    7 : 3,
    8 : 2,
    9 : 2,
    10 : 2,
    11 : 3,
    12 : 2,
*/
};
var cur_separations = {
    0 : [],
    1 : [],
    2 : [],
    3 : [],
    4 : []
};
var mins = [];

function createMap(){
    origBoard = Array.apply(null, Array(16)).map(function(){return 0});
    for(var i=0;i<cells.length;i++){
        cells[i].innerText = "0";
        cells[i].addEventListener('click',tragetCell, false);
    }
}

function tragetCell(square){
    manipulateCell(square.target.id);
}

function manipulateCell(squareId) {
    if (document.getElementById(squareId).innerHTML == 0) {
        origBoard[squareId] = 1;
        document.getElementById(squareId).innerHTML = 1;
        document.getElementById(squareId).style.color = '#074e6b';
    }
    else{
        origBoard[squareId] = 0;
        document.getElementById(squareId).innerHTML = 0;
        document.getElementById(squareId).style.color = '#2e9bc9';
    }
    generateSeparation(origBoard);
    mins.sort();
    let percent = 41.5 - (mins.length - 4);
    document.getElementById('minterms').style.left =  String(percent) + '%';
    document.getElementById('minterms').innerHTML = 'Minterms are ' + mins;
    //QM(cur_separations);
}

createMap();

function generateSeparation(o){
    for(let i=0;i<cells.length;i++){
        for(let j=0;j<5;j++){
            if (separations[j].includes(i) && !(cur_separations[j].includes(i)) && o[i] == 1){
                cur_separations[j].push(i);
                if (!mins.includes(i)){
                    mins.push(i)
                }
            }
            else if (separations[j].includes(i) && (cur_separations[j].includes(i)) && o[i] == 0){
                cur_separations[j].splice((cur_separations[j]).indexOf(i));
                if (mins.includes(i)){
                    mins.splice(mins.indexOf(i), 1);
                }
            } 
        }
    }
}
/*
function QM(cur_separations){
    local_cur_separations = cur_separations;
    for(let i=0;i<5;i++){
        if(local_cur_separations[i].length == 0){delete local_cur_separations[i];}
    }
    console.log(local_cur_separations)
}*/