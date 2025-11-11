// Prevent arrow keys from scrolling the page
window.addEventListener("keydown", function(e) {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  }, false);

const canvas = document.getElementById("maze-game");
const ctx = canvas.getContext("2d");

// Fixed canvas size
canvas.width = 400;
canvas.height = 400;

const rows = 10;
const cols = 10;

// Calculate tile size dynamically based on canvas
let tileSize = canvas.width / cols;

// Player and goal
let player = { x: 0, y: 0, color: "blue" };
const goal = { x: cols - 1, y: rows - 1, color: "green" };

// Maze layout
const maze = [
  [0,0,1,0,0,0,0,0,0,0],
  [1,0,1,0,1,1,1,1,1,0],
  [0,0,0,0,1,0,0,0,1,0],
  [0,1,1,0,1,0,1,0,1,0],
  [0,1,0,0,0,0,1,0,0,0],
  [0,1,0,1,1,0,1,1,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,1,1,0,1,0],
  [0,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,0,1,1,1,1,0],
];

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? "black" : "white";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  // Draw goal
  ctx.fillStyle = goal.color;
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (
    newX >= 0 &&
    newX < cols &&
    newY >= 0 &&
    newY < rows &&
    maze[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;
  }
  drawMaze();
  checkWin();
}

function checkWin() {
  if (player.x === goal.x && player.y === goal.y) {
    setTimeout(() => {
      alert("You reached the goal! 🏆");
      player.x = 0;
      player.y = 0;
      drawMaze();
    }, 10);
  }
}

// Arrow keys
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

// Initial draw
drawMaze();
