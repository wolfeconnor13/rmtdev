import { forwardRef } from "react";
import { useBookmarksContext } from "../hooks/hooks";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});

export default BookmarksPopover;
