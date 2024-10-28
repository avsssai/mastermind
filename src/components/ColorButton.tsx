import { Color, useStore } from "../store/useStore";
import { cn } from "../utils/cn";

export default function ColorButton({
  color,
  row,
  column,
  onSelectColor,
}: {
  color: Color | null;
  row: number;
  column: number | undefined;
  onSelectColor: () => void;
}) {
  const setColorOnBoard = useStore((state) => state.setColorOnBoard);
  const currentRow = useStore((state) => state.currentRow);
  const boardSetter = () => {
    console.log(row, column, "inside");
    setColorOnBoard(row, column!, { color });
    onSelectColor();
  };
  const bg = color === null ? "" : color;
  return (
    <button
      className={cn(`w-[40px] h-[40px] rounded-full border-[1px] border-black`)}
      style={{
        background: bg,
      }}
      onClick={() => boardSetter()}
      disabled={row !== currentRow}
    ></button>
  );
}
