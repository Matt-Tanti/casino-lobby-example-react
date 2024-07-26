import { useNavigate } from "react-router-dom";
import { Game, Styles } from "../../types/modelTypes";

type GameThumbnailProps = {
  game: Game;
};

const styles: Styles = {
  container: {
    height: "auto",
    display: "flex",
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
  },
  title: {
    margin: "0.8rem",
    textAlign: "start",
  },
};

const GameThumbnail = ({ game }: GameThumbnailProps) => {
  const navigate = useNavigate();

  // On click navigate to game overview
  const handleClick = () => {
    navigate(`game/${game.slug}`);
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <img style={styles.image} src={game.game_thumbnail ?? "#"} />
      <div style={styles.titleContainer}>
        <p style={styles.title}>{game.title}</p>
      </div>
    </div>
  );
};

export default GameThumbnail;
