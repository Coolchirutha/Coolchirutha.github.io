var canvas = document.getElementById('snakeGame');
    var context = canvas.getContext('2d');
    var size = 16;
    var bakara = 0;
    var score = 0;

    var snake = {
      x: 160,
      y: 160,
      xc: size,
      yc: 0,
      cells: [],
      maxCells: 4
    };
    var apple = {
      x: 320,
      y: 320
    };

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var displayScore = function() {
      var score_text = "Score: " + score;
      context.fillStyle = 'white';
      context.fillText(score_text, 170, 395);
    }
    // Main function being looped
    function loop() {
      requestAnimationFrame(loop);

      if (++bakara < 4) {
        return;
      }
      bakara = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      snake.x += snake.xc;
      snake.y += snake.yc;
      if (snake.x < 0) {
        snake.x = canvas.width - size;
      } else if (snake.x >= canvas.width) {
        snake.x = 0;
      }

      if (snake.y < 0) {
        snake.y = canvas.height - size;
      } else if (snake.y >= canvas.height) {
        snake.y = 0;
      }
      snake.cells.unshift({
        x: snake.x,
        y: snake.y
      });
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }
      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, size - 1, size - 1);
      context.fillStyle = 'green';
      snake.cells.forEach(function(cell, index) {

        context.fillRect(cell.x, cell.y, size - 1, size - 1);
        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          apple.x = getRandomInt(0, 25) * size;
          apple.y = getRandomInt(0, 25) * size;
          score++;
        }

        //snake died by collision
        for (var i = index + 1; i < snake.cells.length; i++) {

          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.xc = size;
            snake.yc = 0;
            apple.x = getRandomInt(0, 25) * size;
            apple.y = getRandomInt(0, 25) * size;
            score = 0;
          }
        }
        displayScore();
      });
    }
    //Adding event listener to check keyboard events
    document.addEventListener('keydown', function(e) {

      //Left arrow pressed
      if (e.which === 37 && snake.xc === 0) {
        snake.xc = -size;
        snake.yc = 0;
      }
      // Up arrow pressed
      else if (e.which === 38 && snake.yc === 0) {
        snake.yc = -size;
        snake.xc = 0;
      }
      // Right arrow pressed
      else if (e.which === 39 && snake.xc === 0) {
        snake.xc = size;
        snake.yc = 0;
      }
      // Down arrow pressed
      else if (e.which === 40 && snake.yc === 0) {
        snake.yc = size;
        snake.xc = 0;
      }
    });
    requestAnimationFrame(loop);
