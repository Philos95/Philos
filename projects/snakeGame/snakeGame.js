var width=400;
var height=600;

let snake;
let food;
let GameOver = false;


function setup() {
    var cnv = createCanvas(400, 600);
   /* var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;*/
    /*cnv.position(cnv.position);*/
    cnv.parent('sketch-holder');
    background(0);
    frameRate(2);

    snake = new Snake(100,200);
    food = new Food();
    
}

function draw() {
    background(0);
    
    snake.move();

    if(snake.x<=food.x+5 && snake.x>=food.x-5 && snake.y<= food.y+5 && snake.y>=food.y-5)
    {
        food.regen();
        snake.addPiece();
    }
    snake.display();
    food.display();
 }


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.setDirection("left");
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDirection("right");
    } else if (keyCode === UP_ARROW) {
        snake.setDirection("up");
    } else if (keyCode === DOWN_ARROW) {
        snake.setDirection("down");
    }
}






 




 



 