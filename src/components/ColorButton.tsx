import { cn } from "../utils/cn";

export default function ColorButton({ color }: { color: string }) {
  console.log(color);
  let buttonBg = `bg-${color}-500`;
  return (
    <button className={cn(`w-[40px] h-[40px] rounded-full`, buttonBg)}></button>
  );
}
