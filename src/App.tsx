import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="h-full md:p-8 flex justify-center">
      <div className="flex">
        <Board />
      </div>
    </div>
  );
}

export default App;
