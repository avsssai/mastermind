import { Color } from "../store/useStore";

export default function RowPin({
  color,
}: {
  color: Color | null;
  row: number;
}) {
  const bg = color === null ? "white" : color;
  return (
    <div
      className="h-[30px] w-[30px] rounded-full outline-gray-400 outline p-1"
      style={{ background: bg }}
    ></div>
  );
}
