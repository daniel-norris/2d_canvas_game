((d) => {

    let canvas = d.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    let x = canvas.width / 2;
    let y = canvas.height - 30;

    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth) / 2;

    let dx = 4; 
    let dy = -4; 

    let ballRadius = 10; 
    let gameColor = "red"; 

    let rightPressed = false;
    let leftPressed = false;

    let score = 0; 
    let lives = 3; 

    let brickRowCount = 10;
    let brickColumnCount = 11;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 15;

    let bricks = [];

    for(let c = 0; c < brickColumnCount; c += 1) {
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r += 1) {
            bricks[c][r] = { 
                x: 0, 
                y: 0, 
                status: 1 
            };
        }
    }

    drawBall = () => {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = gameColor; 
        ctx.fill();
        ctx.closePath();
    }

    drawPaddle = () => {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = gameColor;
        ctx.fill();
        ctx.closePath();
    }

    drawBricks = () => {
        for(let c = 0; c < brickColumnCount; c++) {
            for(let r = 0; r < brickRowCount; r++) {
                if(bricks[c][r].status === 1) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = gameColor;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks(); 
        collisionDetection();
        drawBall();
        drawPaddle(); 
        drawScore(); 
        drawLives(); 
        
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        if(y + dy < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy * 1.05;
            } else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    d.location.reload();
                } else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 4;
                    dy = -4;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        x += dx;
        y += dy;

        if(rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width){
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }

        requestAnimationFrame(draw);
    }

    collisionDetection = () => {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score += 1; 
                        if(score === brickRowCount*brickColumnCount) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            d.location.reload();
                        }
                    }
                }
            }
        }
    }

    drawScore = () => {
        ctx.font = "16px Arial";
        ctx.fillStyle = gameColor;
        ctx.fillText("Score: " + score, 8, 20);
    }

    drawLives = () => {
        ctx.font = "16px Arial";
        ctx.fillStyle = gameColor;
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    keyDownHandler = e => {
        if(e.key == "Right" || e.key == "ArrowRight") { 
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    keyUpHandler = e => {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    mouseMoveHandler = e => {
        let relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

    d.addEventListener("keydown", keyDownHandler, false);
    d.addEventListener("keyup", keyUpHandler, false);
    d.addEventListener("mousemove", mouseMoveHandler, false);

    draw(); 


})(document); 