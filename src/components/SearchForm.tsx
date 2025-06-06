import { useSearchTextContext } from "../hooks/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
    </form>
  );
}
