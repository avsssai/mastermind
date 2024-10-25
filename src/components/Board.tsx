import Row from "./Row";

export default function Board() {
  return (
    <div className="flex p-2 grow h-[80vh] mx-auto w-[80vw] sm:w-[450px] bg-gradient-to-t rounded-md shadow-xl bg-slate-300 via-neutral-400 to-slate-400">
      <div className="grid grid-rows-10 w-full">
        {Array(10)
          .fill(0)
          .map((row) => (
            <Row key={row} />
          ))}
      </div>
    </div>
  );
}
