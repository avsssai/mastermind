import { Pin, useStore } from "../store/useStore";
import { cn } from "../utils/cn";
import ColorPicker from "./ColorPicker";

export default function BoardRow({
  rowPins,
  className,
  row,
}: {
  rowPins: Pin[];
  row: number;
  className?: string;
}) {
  const currentRow = useStore((state) => state.currentRow);
  return (
    <div className={cn("border-b-2 w-full flex", className)}>
      <div className="w-[20%] p-2">
        <div className={cn("bg-slate-400 rounded-md h-full items-center")}>
          <GameResPins pins={rowPins} />
        </div>
      </div>
      <div
        className={cn(
          "flex-1 flex justify-between items-center px-4",
          row === currentRow ? "bg-green-300 rounded-md" : ""
        )}
      >
        {rowPins.map((pin) => (
          <ColorPicker key={`${pin.row}-${pin.column}`} pin={pin} />
        ))}
      </div>
      <div className="w-[20%] p-2">
        <div className="bg-black rounded-md h-full items-center"></div>
      </div>
    </div>
  );
}

function GameResPins({ pins }: { pins: Pin[] }) {
  const pinsArr = pins.filter(
    (pin) => pin.placement === "correct" || pin.placement === "misplaced"
  );
  pinsArr.sort((a, b) => {
    if (a.placement === "misplaced" && b.placement === "correct") {
      return -1;
    } else if (a.placement === "correct" && b.placement === "misplaced") {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full justify-items-center">
      {pinsArr.map((pin) => (
        <GamePin pin={pin} key={`${pin.color}-${pin.color}-${pin.column}`} />
      ))}
    </div>
  );
}

function GamePin({ pin }: { pin: Pin }) {
  return (
    <span
      className={cn(
        "w-[10px] h-[10px] rounded-full outline self-center ",
        pin.placement === "correct" && "bg-red-500",
        pin.placement === "misplaced" && "bg-white"
      )}
    ></span>
  );
}
