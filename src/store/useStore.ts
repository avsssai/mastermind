import { create } from "zustand";
import { COLORS } from "../constants/colors";
import { createDistinctSolution } from "../utils/createSolution";
import { persist } from "zustand/middleware";
import { makeBoard } from "../utils/makeBoard";
import { produce } from "immer";

export type Color = (typeof COLORS)[keyof typeof COLORS];

export interface Row {
  row: number;
  pins: Pin[];
}

export interface Pin {
  placement: "correct" | "misplaced" | "incorrect" | null;
  color: Color | null;
  row: number;
  column?: number;
}

interface Store {
  board: Row[];
  currentRow: number;
  isGameRunning: boolean;
  numberOfRounds: number;
  score: number;
  gameInitialized: boolean;
  createSolution: () => Color[];
  initializeGame: () => void;
  solution: Color[];
  setColorOnBoard: (row: number, column: number, updates: Partial<Pin>) => void;
  judgeRow: () => void;
  increaseRowCount: () => void;
  checkGameComplete: () => void;
  resetGame: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      board: [],
      currentRow: 0,
      isGameRunning: true,
      gameInitialized: false,
      numberOfRounds: 3,
      score: 0,
      solution: [],
      createSolution: () => createDistinctSolution(),
      initializeGame: () => {
        set((state) => {
          if (!state.gameInitialized) {
            const sol = createDistinctSolution();
            const initialBoard = makeBoard();
            return {
              solution: sol,
              gameInitialized: true,
              board: initialBoard,
            };
          }
          return state;
        });
      },
      resetGame: () => {
        set(
          produce((state: Store) => {
            state.gameInitialized = false;
            state.board = [];
            state.currentRow = 0;
            state.score = 0;
            state.initializeGame();
          })
        );
      },
      increaseRowCount: () =>
        set(
          produce((state: Store) => {
            ++state.currentRow;
          })
        ),
      setColorOnBoard: (row: number, column: number, updates) => {
        set(
          produce((state: Store) => {
            const rowOnBoard = state.board.find((r) => r.row === row);
            if (!rowOnBoard) return;
            const pin = rowOnBoard.pins.find((p) => p.column === column);
            if (!pin) return;
            Object.assign(pin, updates);
          })
        );
      },
      checkGameComplete: () => {
        set(
          produce((state: Store) => {
            const triesExhaust = state.currentRow >= 9;
            const curRow = state.board.find((r) => r.row === state.currentRow);
            const allComplete = curRow?.pins.every(
              (pin) => pin.placement === "correct"
            );
            if (triesExhaust || allComplete) {
              state.isGameRunning = false;
            } else {
              ++state.currentRow;
            }
          })
        );
      },
      judgeRow: () => {
        set(
          produce((state: Store) => {
            const currentRowNumber = state.currentRow;
            const row = state.board.find((r) => r.row === currentRowNumber);
            const solution = state.solution;
            if (!row) return;
            for (let i = 0; i < row.pins.length; i++) {
              if (solution.includes(row.pins[i].color!)) {
                if (row.pins[i].color === solution[i]) {
                  row.pins[i].placement = "correct";
                  continue;
                } else {
                  row.pins[i].placement = "misplaced";
                }
              } else {
                row.pins[i].placement = "incorrect";
              }
            }
            // state.checkGameComplete();
            // if (state.isGameRunning) {
            //   state.increaseRowCount();
            // }
          })
        );
      },
    }),
    { name: "game-state" }
  )
);
