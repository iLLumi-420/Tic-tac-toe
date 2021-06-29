// selectors and variables
const xClass = 'x';
const oClass = 'o';
const cellElement = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
let xTurn = true ;
const winningMessage = document.querySelector('.winningMessage');
const winningText = document.querySelector('.winningText');
const restartButton = document.querySelector('.restartButton');
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

gameStart();

function gameStart(){
cellElement.forEach(cell =>{
    cell.addEventListener('click', displayButton, {once:true})
    })
    setBoardClass();
}

function displayButton(e){
    console.log('clicked');
    const cell = e.target ;
    const currentClass = xTurn? xClass : oClass ;
    placeMark(cell , currentClass);
    switchTurn();
    setBoardClass();
    if(checkWin(currentClass)){
        winningMessage.classList.add('show');
        winningText.innerText = currentClass === 'x'? "X wins" : "O wins!!";
        restartButton.addEventListener('click',()=>{
            window.location = './index.html'
        })
    }
    if(checkDraw(cellElement)){
        winningText.innerText = 'Draw!';
        winningMessage.classList.add('show');
        restartButton.addEventListener('click',()=>{
            window.location = './index.html'
        })
    }

}
function checkDraw(cellElement){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(xClass)||cell.classList.contains(oClass)
    })
}

function placeMark(cell ,Class){
    cell.classList.add(Class);
}
function switchTurn(){
    xTurn = !xTurn
    console.log(xTurn);
}
function setBoardClass(){
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if(xTurn){
        board.classList.add(xClass);
    }
    else{
        board.classList.add(oClass);
    }
}
function checkWin(currentClass){
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}