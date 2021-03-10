export function getUnvisitedNeighbors(grid, node) {
  const neighbors = [];
  const { row, col } = node;
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// backtrack for the shortest path
export function getNodesInShortestPath(finishNode) {
  const nodeInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodeInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodeInShortestPathOrder;
}
