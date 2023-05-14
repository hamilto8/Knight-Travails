// build a function knightMoves that shows the shortest possible way to get from one square to another on an 8x8 grid by outputting all square the knight will stop on along the way. You can think of the board as having 2-dimensional coordinates. Your function would look something like this: knightMoves([0,0], [1,2]) == [[0,0], [1,2]]

class Square {
  constructor(x, y, dist = 0, parent = null) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.parent = parent;
  }
}

function knightMoves(start, finish) {
  const [startX, startY] = start;
  const [finishX, finishY] = finish;
  const possibleMoves = [
    [1, 2],
    [2, 1],
    [-1, -2],
    [-2, -1],
    [1, -2],
    [-1, 2],
    [2, -1],
    [-2, 1],
  ];
  const queue = [new Square(startX, startY)];
  const visited = Array(8)
    .fill()
    .map(() => Array(8).fill(false));
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const currentSquare = queue.shift();
    if (currentSquare.x === finishX && currentSquare.y === finishY) {
      return tracePath(currentSquare);
    }
    possibleMoves.forEach((move) => {
      const newX = currentSquare.x + move[0];
      const newY = currentSquare.y + move[1];
      if (
        newX >= 0 &&
        newX <= 7 &&
        newY >= 0 &&
        newY <= 7 &&
        !visited[newX][newY]
      ) {
        visited[newX][newY] = true;
        queue.push(
          new Square(newX, newY, currentSquare.dist + 1, currentSquare)
        );
      }
    });
  }
}

function tracePath(square) {
  const path = [];
  while (square !== null) {
    path.unshift([square.x, square.y]);
    square = square.parent;
  }
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((position) => console.log(position));
}

knightMoves([3, 3], [4, 3]);
