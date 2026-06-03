// Demos a controlled input
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label>
      Search applications:
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="company or role"
      />
    </label>
  )
}

export default SearchBar