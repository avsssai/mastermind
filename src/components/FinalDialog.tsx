import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { useStore } from "../store/useStore";
import { cn } from "../utils/cn";

export default function NewGameDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const resetGame = useStore((state) => state.resetGame);
  const gameWon = useStore((state) => state.gameWon);
  const solution = useStore((state) => state.solution);
  const confirmResetGame = () => {
    resetGame();
    setIsOpen(false);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-400 opacity-70 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-xl text-center font-bold">
            {gameWon ? "Congratulations! you win!" : "All tries exhausted!"}
          </Dialog.Title>
          <Dialog.Description className="text-center mt-4 items-baseline">
            <div className="mb-6">
              <p className="text-center mt-2">The solution</p>
              <div className="flex gap-2 mt-4 justify-between max-w-[200px] mx-auto">
                {solution.map((item) => (
                  <span
                    className={cn("h-8 w-8 rounded-full outline")}
                    style={{ background: item }}
                  ></span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-lg font-bold mb-4">Start a new game?</p>
              <button
                onClick={() => confirmResetGame()}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
              >
                Yes
              </button>
              <button
                className="underline hover:no-underline"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
