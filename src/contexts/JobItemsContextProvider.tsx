import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../hooks/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: "relevant" | "recent") => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // consume other context
  const { debouncedSearchText } = useSearchTextContext();
  //state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived state
  const totalNumberOfResults = jobItems?.length || 0;
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / 7); // Limit to 10 items for pagination

  // event handlers / actions
  const handleChangePage = useCallback(
    () => (direction: PageDirection) => {
      if (direction === "next") {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "previous") {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    },
    []
  );

  const handleChangeSortBy = useCallback(
    () => (newSortBy: "relevant" | "recent") => {
      setCurrentPage(1); // Reset to first page when changing sort
      setSortBy(newSortBy);
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );
  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
