import * as HoverCard from "@radix-ui/react-hover-card";
import RowPin from "./RowPin";
import { useState } from "react";
import { COLORS } from "../constants/colors";
import ColorButton from "./ColorButton";
import { Pin, useStore } from "../store/useStore";

export default function ColorPicker({ pin }: { pin: Pin }) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard.Root open={open}>
      <HoverCard.Trigger
        onClick={() => setOpen(!open)}

        // onBlur={() => setOpen(false)}
      >
        <RowPin color={pin.color} row={pin.row} />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-[200px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="grid grid-cols-3 gap-4 items-center justify-center">
            {Object.values(COLORS).map((color) => (
              <ColorButton
                color={color}
                key={color}
                row={pin.row}
                column={pin.column}
              />
            ))}
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
