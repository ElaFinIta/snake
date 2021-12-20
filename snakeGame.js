

function Snake() {

    const boardColor = "yellow";
    const boardBg = "grey";
    const snakeBodyColor = "yellow";

    let snakebody = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200},
    ];

    let changeDirection = false;
    // horizontal velocity
    let dx = 10;
    // vertical velocity
    let dy = 0;

    // show game on canvas
    const snakeboard = document.getElementById("CanvasScreen");
    const snakeboardD = snakeboard.getContext("2d");

    // start game
    main();

    // calling func repeatedly to keep game running

    function main() {
        document.addEventListener("keydown", change_direction);
        if (has_game_ended()) return;
        changingDirection = true;
        setTimeout(function onTick() {
            clear_board();
            move_snake();
            drawSnake();

            main();
        }, 100)
    }

    // draw ba border around the canvas
    function clear_board() {
        snakeboardD.fillStyle = boardBg;
        snakeboardD.strokestyle = boardColor;
        snakeboardD.fillRect(0, 0, snakeboard.width, snakeboard.height);
        snakeboardD.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    // drar snake on canvas
    function drawSnake() {
        // draw esch part
        snakebody.forEach(draw);
    }

    // draw one part of snake
    function draw(snakePart) {
        snakeboardD.fillStyle = snakeBodyColor;
        snakeboardD.strokestyle = snakeBodyColor;

        snakeboardD.fillRect(snakePart.x, snakePart.y, 10, 10);
        // draw a board around the snake part
        snakeboardD.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function has_game_ended() {
        for (let i = 5; i < snakebody.length; i++) {
            // catching the tail
            if (snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y) return true;
        }
        const hitLeftWall = snakebody[0].x < 0;
        const hitRightWall = snakebody[0].x > snakeboard.width - 10;
        const hitTopWall = snakebody[0].y < 0;
        const hitBottomWall = snakebody[0].y > snakeboard.height - 10;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }


    // key press function to use keycode to use keypress event

    function change_direction(event) {
        const LEFT_KEY = 65;  // a
        const RIGHT_KEY = 68;  // d
        const UP_KEY = 87; // w
        const DOWN_KEY = 83;  // ascii for s

        // if (changingDirection) return;
        changingDirection = true;
        const keypress = event.keyCode;
        const goingUp = dy === 10;
        const goingDown = dy === -10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
        if (keypress === LEFT_KEY && !goingRight) {
            dx = -10; 
            dy = 0;
        }
        if (keypress === UP_KEY && !goingDown) {
            dx = 0; 
            dy = -10;
        }
        if (keypress === RIGHT_KEY && !goingLeft) {
            dx = 10; 
            dy = 0;
        }
        if (keypress === DOWN_KEY && !goingUp) {
            dx = 0; 
            dy = 10;
        }
    }

    function move_snake() {
        // create snake head
        const head ={x: snakebody[0].x+dx, y: snakebody[0].y+dy};

        // add new head to the beginning of snake body
        snakebody.unshift(head);
        snakebody.pop();
    }
}

Snake();