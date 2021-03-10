import { getUnvisitedNeighbors } from "./utils";

export function bfs(grid, startNode, finishNode) {
  const queue = [startNode];
  const visitedNodesInOrder = [];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode === finishNode) return visitedNodesInOrder;
    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    const neighbors = getUnvisitedNeighbors(grid, currentNode);
    for (const neighbor of neighbors) {
      queue.push(neighbor);
      neighbor.previousNode = currentNode;
    }
  }
  // in case no path is found
  return visitedNodesInOrder;
}
