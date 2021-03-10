import { getUnvisitedNeighbors } from "./utils";

// the Dijkstra's algorithm
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // if this node is a wall, continue
    if (closestNode.isWall) continue;
    // if closed unvisited node is with distance infinity
    // then there is no available path to the finish node
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // mark the closest node as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(grid, closestNode);
  }
}

// some helper functions
function sortNodesByDistance(nodes) {
  nodes.sort((node1, node2) => node1.distance - node2.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(grid, node) {
  const unvisitedNeighbors = getUnvisitedNeighbors(grid, node);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
