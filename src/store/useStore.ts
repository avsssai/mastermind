import { create } from "zustand";
import { COLORS } from "../constants/colors";
import { createDistinctSolution } from "../utils/createSolution";
import { persist } from "zustand/middleware";
import { makeBoard } from "../utils/makeBoard";
import { produce } from "immer";

export type Color = (typeof COLORS)[keyof typeof COLORS];

export interface Pin {
  placement: "correct" | "misplaced" | "incorrect" | null;
  color: Color | null;
  row: number;
  column?: number;
}

interface Store {
  board: Pin[][];
  currentRow: number;
  isGameRunning: boolean;
  numberOfRounds: number;
  score: number;
  gameInitialized: boolean;
  createSolution: () => Color[];
  initializeGame: () => void;
  solution: Color[];
  setColorOnBoard: (row: number, column: number, color: Color | null) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      board: [],
      currentRow: 0,
      isGameRunning: false,
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
      resetGame: () => set({ gameInitialized: false, solution: [] }),
      setColorOnBoard: (row: number, column: number, color: Color | null) => {
        set(
          produce((state: Store) => {
            state.board[row][column].color = color;
          })
        );
      },
    }),
    { name: "game-state" }
  )
);
