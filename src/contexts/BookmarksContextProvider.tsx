import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../hooks/hooks";
import { JobItemExpanded } from "../lib/types";

type BookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: JobItemExpanded[];
  handleToggleBookmark: (id: number) => void;
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

type BooksmarksContextProviderProps = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: BooksmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );
  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      // If the ID is already bookmarked, remove it
      setBookmarkedIds((prev) =>
        prev.filter((bookmarkId) => bookmarkId !== id)
      );
    } else {
      // If the ID is not bookmarked, add it
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedJobItems,
        handleToggleBookmark,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
