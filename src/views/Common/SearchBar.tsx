import React from "react";
import { Styles } from "../../types/modelTypes";

const styles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

const SearchBar: React.FC = () => {
  return (
    <div style={styles.container}>
      <input type="text" placeholder="Search..." style={styles.input} />
    </div>
  );
};

export default SearchBar;
