import { ChangeEvent, useContext } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Styles } from "../../types/modelTypes";

const styles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  },
  input: {
    flex: 1,
    padding: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

const SearchBar = () => {
  const { setSearchFilter } = useContext(GamesContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        style={styles.input}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
