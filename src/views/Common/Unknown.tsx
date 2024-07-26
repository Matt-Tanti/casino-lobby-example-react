import { useNavigate } from "react-router-dom";

type UnknownProps = {};

// Simple 403 page
const Unknown = ({}: UnknownProps) => {
  const navigate = useNavigate();

  const handleBackToLobby = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Error 403</h1>
      <p>Page not found!</p>
      <button onClick={handleBackToLobby}>Back to lobby</button>
    </div>
  );
};

export default Unknown;
