// the Dijkstra's algorithm
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // if this node is a wall, continue
        if(closestNode.isWall) continue;
        // if closed unvisited node is with distance infinity
        // then there is no available path to the finish node
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        // mark the closest node as visited
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(grid, closestNode);
    }
}


// some helper functions
function sortNodesByDistance(nodes) {
    nodes.sort((node1, node2) => node1.distance - node2.distance);
}

function getAllNodes(grid) {
    const nodes = [];
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function getUnvisitedNeighbors(grid, node) {
    const neighbors = [];
    const {row, col} = node;
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col])
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(grid, node) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, node);
    for(const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

// backtrack for the shortest path
export function getNodesInShortestPath(finishNode) {
    const nodeInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null) {
        nodeInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodeInShortestPathOrder;
}
