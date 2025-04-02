// initialising the chessboard and filling it with blank templates.
const board = [];
for (let y = 0; y < 8; y++) {
  board.push([]);
  for (x = 0; x < 8; x++) {
    board[y].push({ distance: null, prev: null });
  }
}
// for storing the tile / vertex we wish to get to
let target;
// queue of operations for storing the tiles / vertices we must visit next
const queue = [];
// just a boolean variable that will ensure that the search stops if the target is found
let found = false;

// main function that the user inputs coordinates into (format is [x, y])
function findShortestPath(startCoordinates, targetCoordinates) {
  if (startCoordinates.length !== 2 || targetCoordinates.length !== 2)
    throw Error(
      "Please provide the coordinates in the following format: [x, y]"
    );
  target = targetCoordinates;
  visitVertex(...startCoordinates, 0, null);

  // this loop visits the next item in the array whenever call stack is empty
  while (queue.length > 0 && !found) {
    visitVertex(...queue.shift());
  }
}

// this fills the current vertices' / tiles' designated template in the board array
function visitVertex(x, y, dist, prev) {
  // checks if the current tile / vertice has been visited before
  if (board[y][x].distance !== null) return;
  board[y][x].distance = dist;
  board[y][x].prev = prev;
  // checks if the current tile / vertice is the target
  if (x === target[0] && y === target[1]) {
    let chain = `[${x}, ${y}] `;
    let pointer = board[y][x];
    // collects the necessary info and prints the path to the target along with distance from root
    while (pointer.prev) {
      chain = `[${pointer.prev[0]}, ${pointer.prev[1]}] ${chain}`;
      pointer = board[pointer.prev[1]][pointer.prev[0]];
    }

    console.log(`\n[${x}, ${y}] has been found!\n
        You made it in ${dist} moves!\n
        The path was: \n
        ${chain}`);
    // changes found to true, breaking the condition of the while() loop in main fn
    found = true;
    return dist;
  }
  // calls next function and pushes every returned tile / vertice to the queue for later visiting
  for (const subArr of findPossibleVertexes(x, y, ++dist, [x, y])) {
    queue.push(subArr);
  }
}

// called by above fn, returns array with possible next tiles to visit, along with their distance from root and previous tile.
function findPossibleVertexes(x, y, dist, prev) {
  const arr = [];
  if (x - 2 >= 0 && y + 1 <= 7) {
    arr.push([x - 2, y + 1, dist, prev]);
  }
  if (x - 1 >= 0 && y + 2 <= 7) {
    arr.push([x - 1, y + 2, dist, prev]);
  }
  if (x + 1 <= 7 && y + 2 <= 7) {
    arr.push([x + 1, y + 2, dist, prev]);
  }
  if (x + 2 <= 7 && y + 1 <= 7) {
    arr.push([x + 2, y + 1, dist, prev]);
  }
  if (x - 2 >= 0 && y - 1 >= 0) {
    arr.push([x - 2, y - 1, dist, prev]);
  }
  if (x - 1 >= 0 && y - 2 >= 0) {
    arr.push([x - 1, y - 2, dist, prev]);
  }
  if (x + 1 <= 7 && y - 2 >= 0) {
    arr.push([x + 1, y - 2, dist, prev]);
  }
  if (x + 2 <= 7 && y - 1 >= 0) {
    arr.push([x + 2, y - 1, dist, prev]);
  }

  return arr;
}
