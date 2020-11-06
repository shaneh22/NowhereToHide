const board_border = 'black';
const board_background = "white";
const snake_col = 'chartreuse';
const snake_border = 'black';
const food_col = 'red';
const food_border = 'black';

let dx = 10;
let dy = 0;

let foodX;
let foodY;

let score = 0;

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

const board = document.getElementById("snakeBoard");
const context = board.getContext("2d");
main();

generateFood();

document.addEventListener("keydown", controls)

function main() {

    if(gameOver()) {
        return;
    }

    changeDirection = false;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        movement();
        drawSnake();
        main();

    }, 100)

}

function clearCanvas() {
    context.fillStyle = board_background;
    context.strokestyle = board_border;
    context.fillRect(0, 0, board.width, board.height);
    context.strokeRect(0, 0, board.width, board.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {

    context.fillStyle = snake_col;
    context.strokestyle = snake_border;
    context.fillRect(snakePart.x, snakePart.y, 10, 10);
    context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function movement() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const is_eaten = snake[0].x === foodX && snake[0].y === foodY;
    if(is_eaten) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        generateFood()
    } else {
        snake.pop();
    }

}

function controls(event) {
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    const key = event.keyCode;
    const moveUp = dy === -10;
    const moveDown = dy === 10;
    const moveLeft = dx === -10;
    const moveRight = dx === 10;

    if(key === left && !moveRight) {
        dx = -10;
        dy = 0;
    }

    if(key === up && !moveDown) {
        dx = 0;
        dy = -10;
    }

    if(key === right && !moveLeft) {
        dx = 10;
        dy = 0;
    }

    if(key === down && !moveUp) {
        dx = 0;
        dy = 10;
    }

}

function drawFood() {
    context.fillStyle = food_col;
    context.strokestyle = food_border;
    context.fillRect(foodX, foodY, 10, 10);
    context.strokeRect(foodX, foodY, 10, 10);
}

function randomLocation(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function generateFood() {
    foodX = randomLocation(0, board.width - 10);
    foodY = randomLocation(0, board.height - 10);
    snake.forEach(function eaten(part) {
        const is_eaten = part.x == foodX && part.y == foodY;
        if(is_eaten) {
            generateFood()
        }
    });
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (collided) {
            return true;
        }
    }
    const leftWall = snake[0].x < 0;
    const rightWall = snake[0].x > board.width - 10;
    const topWall = snake[0].y < 0;
    const bottomWall = snake[0].y > board.height - 10;

    return leftWall || rightWall || topWall || bottomWall;
}