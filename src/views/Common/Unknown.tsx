import { useNavigate } from "react-router-dom";
import { Styles } from "../../types/modelTypes";

const styles: Styles = {
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
};

// Simple 403 page
const Unknown = () => {
  const navigate = useNavigate();

  // Handle back to lobby button click
  // Navigate back to lobby
  const handleBackToLobby = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div>
        <h1>Error 403</h1>
        <p>Page not found!</p>
        <button onClick={handleBackToLobby}>Back to lobby</button>
      </div>
    </div>
  );
};

export default Unknown;
