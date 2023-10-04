const play = new Audio('background.mp3');
play.volume=0.4;
const eating = new Audio('eating.wav');
const gameover = new Audio('gameover.wav');
//Setting the position of snake head and food
let food = {
    x: 10,
    y: 10
}
let snakedir={
    x:0,y:0
}

let pos = {
    x: 0,
    y: 0
}
let scored=0
let speed = 10;
let ltime = 0;
let snakeArr = [{ x: 20, y: 25 }]
function collide(arr){
    if(snakeArr[0].x===0 || snakeArr[0].x===41 || snakeArr[0].y===0 || snakeArr[0].y===41 )
    return true;
   for(let i=1;i<snakeArr.length-1;i++){
    if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y)
    return true;
   }
    return false;
}
//Main moving function
function move(time) {
    window.requestAnimationFrame(move);
    if ((time - ltime) / 1000 < 1/speed) {
        return;
    }
    ltime = time;
    snakeMove();

}
function snakeMove() {
    //eating food
    if(collide(snakeArr)){
        play.pause();
        gameover.play();
        snakedir={x:0,y:0};
        alert('Game Over');
        snakeArr = [{ x: 20, y: 25 }];
        scored=0;
        score.innerHTML="Score : " + scored;
        speed=10;
    }
        // If food is eaten
        if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
            eating.play();
            speed +=1;
            scored +=1;
            score.innerHTML="Score : " + scored;
            snakeArr.unshift({x:snakeArr[0].x+snakedir.x , y:snakeArr[0].y +snakedir.y});
            let a=1;
            let b=40;
            food={x:Math.round(Math.random()*(b-a)+a) , y:Math.round(Math.random()*(b-a)+a)};
        }
        else {
    // moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
        snakeArr[i+1]={...snakeArr[i]};
    
    snakeArr[0].x +=snakedir.x;
    snakeArr[0].y +=snakedir.y;
}
    board.innerHTML = "";
    snakeArr.forEach((e, i) => {
        let snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if (i === 0)
            snake.classList.add('head');

        else
            snake.classList.add('snakeBody');
        board.appendChild(snake);
    });
    let foodE = document.createElement('div');
    foodE.style.gridRowStart = food.y;
    foodE.style.gridColumnStart = food.x;
    foodE.classList.add('food');
    board.appendChild(foodE);
}
window.addEventListener('keydown', a => {
    play.play();  
    snakedir = {x:0 ,y:0};
    switch (a.key) {
        case 'ArrowUp':
            snakedir.x=0;
            snakedir.y=-1;
            break;
        case 'ArrowDown':
            snakedir.x=0;
            snakedir.y=1;
            break;
        case 'ArrowLeft':
            snakedir.x=-1;
            snakedir.y=0;
            break;
        case 'ArrowRight':
            snakedir.x=1;
            snakedir.y=0;
            break;
        default:
            play.pause();            
    }
});


window.requestAnimationFrame(move);