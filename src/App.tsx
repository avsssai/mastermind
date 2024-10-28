import "./App.css";
import Board from "./components/Board";
import NewGameDialog from "./components/NewGameDialog";
import { useStore } from "./store/useStore";

function App() {
  const initializeGame = useStore((state) => state.initializeGame);
  const gameInitialized = useStore((state) => state.gameInitialized);
  if (!gameInitialized) {
    initializeGame();
  }

  const currentRow = useStore((state) => state.currentRow);
  const judgeCurRow = useStore((state) => state.judgeRow);
  const checkGameComplete = useStore((state) => state.checkGameComplete);
  const board = useStore((state) => state.board);
  const curRowOnBoard = board.find((r) => r.row === currentRow);
  const allFilled = curRowOnBoard?.pins.some((pin) => pin.color === null);
  const judgeGame = () => {
    judgeCurRow();

    checkGameComplete();
    // if (isGameRunning) {
    //   increaseRowCount();
    // }
  };
  return (
    <div className="h-full md:p-8 flex flex-col justify-center">
      <div className="flex">
        <Board />
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={judgeGame}
          disabled={allFilled}
        >
          Submit Row {currentRow + 1}
        </button>
        <NewGameDialog />
      </div>
    </div>
  );
}

export default App;
