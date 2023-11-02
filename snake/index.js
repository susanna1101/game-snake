
const boxSize = 25
const rows = 25
const cols = 25
let board;
let context;

// snake
let snakeX = boxSize * 5
let snakeY = boxSize * 5
let snakeBody = []

let velocityX = 0
let velocityY = 0

//  food
let foodX = boxSize * 10
let foodY = boxSize * 10

let foodCount = 0
let foodCountHtml = document.getElementById('foodCount')
foodCountHtml.innerHTML = foodCount

let gameOver = false

//  game loop
window.onload = function() {
    board = document.getElementById('board')
    board.width = boxSize * cols
    board.height = boxSize * rows
    context = board.getContext('2d')

    placeFood()
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 1000/10)
}

function update() {

    if(gameOver) {
        return
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)


    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, boxSize, boxSize)
    if(snakeX === foodX && snakeY === foodY) {
        placeFood()
        foodCount++
        snakeBody.push(snakeX, snakeY)
    }
    foodCountHtml.innerHTML = foodCount

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * boxSize
    snakeY += velocityY * boxSize
    context.fillRect(snakeX, snakeY, boxSize, boxSize)
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize)
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            // snakeBody = []
            foodCount = 0
            foodCountHtml.innerHTML = foodCount
        }
    }
    if(snakeX < 0 || snakeX > cols*boxSize || snakeY < 0 || snakeY > rows*boxSize) {
        gameOver = true
        alert('Game Over')
    }

    // if(snakeBody.length > 100) {
    //     gameOver = false
    //     alert('You Win')
    // }
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true
            alert('Game Over')
        }
    }
}

function changeDirection(e) {
    if(e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }else if(e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }else if(e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }else if(e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}
function placeFood() {
    foodCount++
    // 0 - 1 * cols -> 0-19.9999 -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * boxSize
    foodY = Math.floor(Math.random() * rows) * boxSize
}
// const arr = [-5, -3, 0, 1, 2, 4]

// function returnSqrt(arr){
//     const sqrtArr = []
//     for(let i = 0; i<arr.length; i++){
//         sqrtArr.push(arr[i] * arr[i])
//     }
//     let minArr = []
//     let min = sqrtArr[0]
//     for(let i = 1; i<=sqrtArr.length; i++){
//         if(sqrtArr[i] !== 0){
//             if( min > sqrtArr[i]){
//                 console.log(min)
//                 minArr.push(min)
//                 min = sqrtArr[i]
//             }
//             continue
//         }
//     }
//     return minArr
// }

// console.log(returnSqrt(arr))