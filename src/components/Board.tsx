import { Pin, useStore, Row } from "../store/useStore";
import BoardRow from "./Row";

export default function Board() {
  const solution = useStore((state) => state.solution);
  let board = useStore((state) => state.board);
  console.log(board);

  return (
    <div className="flex p-2 grow h-[80vh] mx-auto w-[80vw] sm:w-[450px] bg-gradient-to-t rounded-md shadow-xl bg-slate-300 via-neutral-400 to-slate-400">
      <div className="grid grid-rows-10 w-full">
        {/* {board.map((row: Row[], index) => (
          <BoardRow key={index} rowPins={row.} />
        ))} */}
        {board.map((row) => (
          <BoardRow key={row.row} rowPins={row.pins} row={row.row} />
        ))}
      </div>
    </div>
  );
}
