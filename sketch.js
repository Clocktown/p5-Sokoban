
let levelString = `   ####
###  ####
#     $ #
# #  #$ #
# . .#@ #
#########`
let theLevel = [[]]
let playerPos

const wall = "#"
const player = "@"
const box = "$"
const goal = "."
const boxInGoal = "*"
const playerInGoal = "+"
const empty = " "
const validChars = [wall, player, box, goal, boxInGoal, playerInGoal, empty]

const cellSize = 64
let origin
let dimx, dimy

let playerImg, wallImg, goalImg, boxImg, floorImg

function printLevel() {
  theLevel.forEach((row) => {
    let line = ""
    row.forEach((cell) => {
      line += cell
    })
    console.log(line)
  })
}

function loadLevel(level) {
  theLevel = [[]]
  dimx = 0
  dimy = 0
  let y = 0
  let x = 0
  for(let i = 0; i < level.length; i++) {
    let cell = level[i]
    if(cell == "\n") {
      theLevel.push([])
      y++;
      dimx = max(x, dimx)
      x = 0;
    } else {
      if(validChars.includes(cell)) {
        theLevel[y].push(cell)
        if(cell == player) {
          playerPos = createVector(x, y)
        }
      } else {
        // If we encounter an unknown symbol, we just use empty
        theLevel[y].push(empty)
      }
      x++
    }
  }
  dimy = theLevel.length

  theLevel.forEach((row) => {
    let diff = dimx - row.length
    for(let i = 0; i < diff; ++i) {
      row.push(empty)
    }
    console.log(line)
  })

  resizeCanvas(dimx * cellSize, dimy * cellSize)
  origin = createVector(-width/2, -height/2)
}

function setup() {
  createCanvas(400, 400, WEBGL);
  loadLevel(levelString)
  printLevel()

  playerImg = loadImage("img/player.png")
  boxImg = loadImage("img/box.jpg")
  floorImg = loadImage("img/floor.webp")
  goalImg = loadImage("img/goal.png")
  wallImg = loadImage("img/wall.jpg")

  noStroke()
}

function movePlayer(dir) {
  let newPlayerPos = p5.Vector.add(playerPos, dir)
  let currentCell = theLevel[playerPos.y][playerPos.x]
  let newCell = theLevel[newPlayerPos.y][newPlayerPos.x]
  if(newCell == wall) {
    // Cannot move into the wall!
    return
  }
  let newBoxPos = p5.Vector.add(newPlayerPos, dir)
  let newBoxCell = theLevel[newBoxPos.y][newBoxPos.x]

  let wantsMoveBox = newCell == box || newCell == boxInGoal
  let canMoveBox = newBoxCell != box && newBoxCell != boxInGoal && newBoxCell != wall

  if(wantsMoveBox && canMoveBox) {
    // Move the Box
    if(newBoxCell == goal) {
      theLevel[newBoxPos.y][newBoxPos.x] = boxInGoal
    } else {
      theLevel[newBoxPos.y][newBoxPos.x] = box
    }

    if(newCell == boxInGoal) {
      theLevel[newPlayerPos.y][newPlayerPos.x] = goal
    } else {
      theLevel[newPlayerPos.y][newPlayerPos.x] = empty
    }
  } else if(wantsMoveBox) {
    // Want to move box but can't, so no movement
    return
  }

  // Move the player
  newCell = theLevel[newPlayerPos.y][newPlayerPos.x]

  if(newCell == goal) {
    theLevel[newPlayerPos.y][newPlayerPos.x] = playerInGoal
  } else {
    theLevel[newPlayerPos.y][newPlayerPos.x] = player
  }

  if(currentCell == playerInGoal) {
    theLevel[playerPos.y][playerPos.x] = goal
  } else {
    theLevel[playerPos.y][playerPos.x] = " "
  }

  playerPos = newPlayerPos

  printLevel()
}

function keyPressed() {
  if(key == "Escape") {
    loadLevel(levelString)
    printLevel()
  } else if(key == "ArrowRight") {
    movePlayer(createVector(1, 0))
  } else if(key == "ArrowLeft") {
    movePlayer(createVector(-1,0))
  } else if(key == "ArrowUp") {
    movePlayer(createVector(0, -1))
  } else if(key == "ArrowDown") {
    movePlayer(createVector(0,1))
  }
  
}

function drawRect(x, y) {
  rect(origin.x + x * cellSize, origin.y + y * cellSize, cellSize, cellSize)
}

function draw() {
  background(220);
  for(let y = 0; y < dimy; y++) {
    for(let x = 0; x < dimx; x++) {
      texture(floorImg)
      drawRect(x, y)
      let cellType = theLevel[y][x]
      if(cellType == wall) {
        texture(wallImg)
      } else if(cellType == player || cellType == playerInGoal) {
        texture(playerImg)
      } else if(cellType == box || cellType == boxInGoal) {
        texture(boxImg)
      }
      drawRect(x, y)
      if(cellType == goal || cellType == playerInGoal || cellType == boxInGoal) {
        texture(goalImg)
        drawRect(x, y)
      } 
    }
  }
}
