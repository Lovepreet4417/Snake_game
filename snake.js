const canvas= document.querySelector('canvas');
canvas.width=608;
canvas.height=608;
const c=canvas.getContext('2d');
//ground
//food
//snake
//score
// create unit
let score=0, snake, food, highScore=0, game;
let box=32;   // create unit



//load images
let foodImg=new Image();
let ground=new Image();

foodImg.src='img/food.png';
ground.src='img/ground.png';

// load audio
let up=new Audio();
let down=new Audio();
let left=new Audio();
let right=new Audio();
let eat=new Audio();
let dead=new Audio();

up.src='audio/up.mp3';
down.src='audio/down.mp3';
left.src='audio/left.mp3';
right.src='audio/right.mp3';
eat.src='audio/eat.mp3';
dead.src='audio/dead.mp3';

ground.onload= function()
{
    c.drawImage(ground,0,0);
    c.fillStyle='white'
    c.font='40px calibri';
    c.fillText(score, 2*box, 1.6*box);

    c.font='30px calibri';
    c.fillText("Highest Score: "+ highScore, 12*box, 1.4*box);
}


// control the snake
document.addEventListener('keydown', direction);
let dir;

function startGame()
{
    clearInterval(game);
    highScore = Math.max(score, highScore);
    score= 0;
    //create snake
    snake = [];
    snake[0] = {
        x: 9*box,
        y: 10*box,
    };

    //create food
    food = {
        x: Math.floor(Math.random()*17+1)*box,
        y: Math.floor(Math.random()*15+3)*box
    }; 
     
    dir='';

    game = setInterval(draw,100); //call draw function every 100ms
}

function draw()
{
    c.drawImage(ground,0,0);

    for(let i=0;i<snake.length;i++)
    {
        c.fillStyle = (i==0) ? 'green' : 'white';
        c.fillRect(snake[i].x, snake[i].y, box, box);

        c.strokeStyle = 'red';
        c.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    c.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX= snake[0].x;
    let snakeY = snake[0].y;

    //which directions
    if(dir=='left')
    {
        snakeX-=box;
    }
    else if(dir=='up')
    {
        snakeY-=box;
    }
    else if(dir=='right')
    {
        snakeX+=box;
    }
    else if(dir=='down')
    {
        snakeY+=box;
    }

    //if snake eats food
    if(snakeX==food.x && snakeY==food.y)
    {
        // we dont remove the tail here
        score++;
        eat.play();
        food={
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
    }
    else
    {
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

//game over
if(snakeX<box || snakeX>17*box || snakeY<3*box || snakeY>17*box || collision(newHead, snake))
{
   dead.play();
   clearInterval(game);

   c.fillStyle='green';
   c.fillRect(5*box, 8*box, 9*box, 3*box);

   c.fillStyle='white';
   c.font='40px calibri';
   c.fillText("Your Score: " + score, 6*box, 10*box);

}
    snake.unshift(newHead);

    c.fillStyle='white'
    c.font='40px calibri';
    c.fillText(score, 2*box, 1.6*box);

    c.font='30px calibri';
    c.fillText("Highest Score: "+ highScore, 12*box, 1.4*box);
    
    
}

function direction(event)
{
    if(event.keyCode==37 && dir!='right')
    {
        left.play();
        dir='left';
    }
    else if(event.keyCode==38 && dir!='down')
    {
        up.play();
        dir='up';
    } 
    else if(event.keyCode==39 && dir!='left')
    {
        right.play();
        dir='right';
    } 
    else if(event.keyCode==40 && dir!='up')
    {
        down.play();
        dir='down';
    } 
}

function collision(newHead, snake)
{
    for(let i=0;i<snake.length;i++)
    {
        if(newHead.x==snake[i].x && newHead.y==snake[i].y )
        { 
            return true;
        }
    }
    return false;
}









