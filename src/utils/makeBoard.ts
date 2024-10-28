import { GRID } from "../constants/grid";
import { Pin } from "../store/useStore";

export const makeBoard = () => {
  let initialBoard: Pin[][] = [];
  for (let i = GRID.ROWS - 1; i >= 0; i--) {
    let row: Pin[] = [];
    for (let j = 0; j < GRID.ROW_LENGTH; j++) {
      row.push({ row: i, column: j, color: null, placement: null });
    }
    initialBoard.push(row);
  }
  return initialBoard;
};
