import "./App.css";
import Board from "./components/Board";
import { useStore } from "./store/useStore";

function App() {
  const initializeGame = useStore((state) => state.initializeGame);
  const gameInitialized = useStore((state) => state.gameInitialized);
  if (!gameInitialized) {
    initializeGame();
  }
  return (
    <div className="h-full md:p-8 flex justify-center">
      <div className="flex">
        <Board />
      </div>
    </div>
  );
}

export default App;
