import { Pin } from "../store/useStore";
import { cn } from "../utils/cn";
import ColorPicker from "./ColorPicker";

export default function Row({
  rowPins,
  className,
}: {
  rowPins: Pin[];
  className?: string;
}) {
  return (
    <div className={cn("border-b-2 w-full flex", className)}>
      <div className="w-[20%] p-2">
        <div className="bg-slate-400 rounded-md h-full items-center"></div>
      </div>
      <div className="flex-1 flex justify-between items-center px-4">
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
