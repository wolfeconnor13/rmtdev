import { createContext } from "react";
import { useLocalStorage } from "../hooks/hooks";

export const BookmarksContext = createContext(null);

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
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
