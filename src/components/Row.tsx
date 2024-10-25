import RowPin from "./RowPin";

export default function Row() {
  return (
    <div className=" border-b-2 w-full flex">
      <div className="w-[20%] p-2">
        <div className="bg-slate-400 rounded-md h-full items-center"></div>
      </div>
      <div className="flex-1 flex justify-between items-center px-4">
        {Array(4)
          .fill(0)
          .map((key) => (
            <RowPin key={key} />
          ))}
      </div>
      <div className="w-[20%] p-2">
        <div className="bg-black rounded-md h-full items-center"></div>
      </div>
    </div>
  );
}
