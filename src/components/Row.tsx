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
        <div
          className={cn("bg-slate-400 rounded-md h-full items-center")}
        ></div>
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
