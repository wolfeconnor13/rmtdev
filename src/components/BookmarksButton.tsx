import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    console.log("Clicked outside");
    setIsOpen(false);
  };

  useClickOutside([buttonRef, popoverRef], handleClickOutside);

  return (
    <section>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        ref={buttonRef}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
