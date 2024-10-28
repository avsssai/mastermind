import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useStore } from "../store/useStore";

export default function NewGameDialog() {
  const [open, setOpen] = React.useState(false);
  const resetGame = useStore((state) => state.resetGame);
  const confirmResetGame = () => {
    resetGame();
    setOpen(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button>New Game</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-400 opacity-70 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title>Do you really want to start a new game?</Dialog.Title>
          <Dialog.Description className="flex gap-4 mt-4 items-baseline">
            <button
              onClick={() => confirmResetGame()}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
            >
              Yes, new game
            </button>
            <button
              className="underline hover:no-underline"
              onClick={() => setOpen(false)}
            >
              No, continue
            </button>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
