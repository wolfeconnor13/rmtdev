import { useJobItemsContext } from "../hooks/hooks";
import { SortBy } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy: onClick } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sortingType={"relevant"}
        currentSortBy={sortBy}
        onClick={onClick}
      />
      <SortingButton
        sortingType={"recent"}
        currentSortBy={sortBy}
        onClick={onClick}
      />
    </section>
  );
}

type SortingButtonProps = {
  sortingType: SortBy;
  currentSortBy: SortBy;
  onClick: (sortBy: SortBy) => void;
};

function SortingButton({
  sortingType,
  currentSortBy,
  onClick,
}: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(sortingType)}
      className={`sorting__button sorting__button--${sortingType} ${
        currentSortBy === sortingType ? "sorting__button--active" : ""
      }`}
    >
      {sortingType}
    </button>
  );
}
