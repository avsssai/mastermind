import { Color, useStore } from "../store/useStore";

export default function RowPin({
  color,
  row,
}: {
  color: Color | null;
  row: number;
}) {
  const bg = color === null ? "white" : color;
  const currentRow = useStore((state) => state.currentRow);
  return (
    <button
      className="h-[30px] w-[30px] rounded-full outline-gray-400 outline p-1"
      style={{ background: bg }}
      disabled={row !== currentRow}
    ></button>
  );
}
