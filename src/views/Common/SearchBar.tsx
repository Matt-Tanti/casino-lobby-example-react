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
  return (
    <div style={styles.container}>
      <input type="text" placeholder="Search..." style={styles.input} />
    </div>
  );
};

export default SearchBar;
