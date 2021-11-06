import { Component } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../Algorithms/dijkstra";
import { bfs } from "../Algorithms/bfs";
import { getNodesInShortestPath } from "../Algorithms/utils";

import "./PathfindingVisualizer.css";

const NUM_ROWS = 20;
const NUM_COLS = 50;
const START_ROW = 10;
const START_COL = 5;
const FINISH_ROW = 10;
const FINISH_COL = 45;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    // construct the nodes: list of list
    const grid = createGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ gird: newGrid, mouseIsPressed: true });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPath(finishNode);
    this.animateSearching(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBfs() {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPath(finishNode);
    this.animateSearching(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateSearching(visitedNodesInOrder, nodesInShortestPathOrder = []) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-final-path";
      }, 50 * i);
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button
          className="btn"
          onClick={() => {
            this.visualizeDijkstra();
          }}
        >
          Visualize Dijkstra
        </button>
        <button
          className="btn"
          onClick={() => {
            this.visualizeBfs();
          }}
        >
          Visualize BFS
        </button>
        <button
          className="btn"
          onClick={() => {
            this.visualizeBfs();
          }}
        >
          Visualize A*
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      col={col}
                      row={row}
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                    >
                      {" "}
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  // copy the original grid
  const newGrid = grid.slice();
  // get the node which to be wall
  const node = newGrid[row][col];
  // create the new Node
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};
