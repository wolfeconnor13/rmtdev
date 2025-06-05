import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
  currentPage,
  onClick,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"previous"}
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}

      <PaginationButton
        direction={"next"}
        currentPage={currentPage}
        onClick={() => onClick("next")}
      />
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
}) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={onClick}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}{" "}
      {direction === "next" && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
