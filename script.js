//!KMAP!

var origBoard;
var cells = document.querySelectorAll('.cell');
var separations = {
    0 : [0],
    1 : [1,2,4,8],
    2 : [3,5,6,9,10,12],
    3 : [7,11,13,14],
    4 : [15]
};
var cur_separations = {
    0 : [],
    1 : [],
    2 : [],
    3 : [],
    4 : []
};
var qm = [];
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
    mins.sort(function(a, b){return a-b});
    if (mins.length != 0){
        document.getElementById('minterms').innerHTML = 'Minterms are ' + mins;
    }
    else{
        document.getElementById('minterms').innerHTML = 'No minterms selected';
    }
    QM(cur_separations);
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

//CURRENT IMPLEMENTATION : WORKS ONLY FOR BI'S
function QM(cur){
    qm = []
    for(let i=0;i<4;i++){
        if (cur[i].length != 0 && cur[i+1].length != 0){
            for(let j=0;j<cur[i].length;j++){
                for(let k=0;k<cur[i+1].length;k++){
                    if(separations[1].includes(cur[i+1][k]-cur[i][j])){
                        qm.push([cur[i+1][k],cur[i][j],cur[i+1][k]-cur[i][j]])
                    }
                }
            }
        }
        else{
            if(cur[i].length != 0){
                for(let j=0;j<cur[i].length;j++){
                    qm.push([cur[i][j],0,0])
                }
            }
        }
    }
    colours = ['pink','lightblue','lightgreen','lightred']
    console.log(qm)
    for(let i=0;i<qm.length;i++){
        if(qm[i][2] != 0){
            document.getElementById(qm[i][0]).style.backgroundColor = colours[i];
            document.getElementById(qm[i][1]).style.backgroundColor = colours[i];
        }
    }
    if(qm.length == 0){
        document.getElementsByName('table').style.backgroundColor = 'aliceblue';
    }
}