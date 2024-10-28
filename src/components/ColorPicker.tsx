import * as Popover from "@radix-ui/react-popover";
import RowPin from "./RowPin";
import { useRef, useState } from "react";
import { COLORS } from "../constants/colors";
import ColorButton from "./ColorButton";
import { Pin, useStore } from "../store/useStore";

export default function ColorPicker({ pin }: { pin: Pin }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const currentRow = useStore((state) => state.currentRow);

  return (
    <Popover.Root open={open}>
      <Popover.Trigger
        onClick={() => setOpen(!open)}
        // asChild
        // onBlur={() => setOpen(!open)}
        disabled={pin.row !== currentRow}
      >
        <RowPin color={pin.color} row={pin.row} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onPointerDownOutside={() => setOpen(!open)}
          onFocusOutside={() => setOpen(!open)}
          className="w-[200px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
          sideOffset={5}
          ref={dialogRef}
        >
          <div className="grid grid-cols-3 gap-4 items-center justify-center">
            {Object.values(COLORS).map((color) => (
              <ColorButton
                color={color}
                key={color}
                row={pin.row}
                column={pin.column}
                onSelectColor={() => setOpen(false)}
              />
            ))}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
