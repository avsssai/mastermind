import { GRID } from "../constants/grid";
import { Row } from "../store/useStore";

export const makeBoard = () => {
  let initialBoard: Row[] = [];
  for (let i = GRID.ROWS - 1; i >= 0; i--) {
    let row: Row = { row: i, pins: [] };

    for (let j = 0; j < GRID.ROW_LENGTH; j++) {
      row.pins.push({ row: i, column: j, color: null, placement: null });
    }
    initialBoard.push(row);
  }
  return initialBoard;
};
