import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { GamesContext } from "../../contexts/gamesContext";
import { Game, Styles } from "../../types/modelTypes";
import Loading from "../Common/Loading";

const styles: Styles = {
  root: {
    display: "flex",
    flex: 1,
  },
  background: {
    //TODO sticky background
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  },
  containerBackground: {
    position: "relative",
    flex: 1,
    padding: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  container: {
    padding: "1rem",
  },
  title: {
    paddingTop: "0.8rem",
    paddingBottom: "1rem",
  },
  content: {
    textAlign: "left",
  },
  backButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 0,
    left: 0,
    padding: "1rem",
    background: "none",
    border: "none",
  },
  arrowLeft: {
    border: "solid white",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "0.5rem",
    transform: "rotate(135deg)",
    WebkitTransform: "rotate(135deg)",
  },
};

const GameOverview = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { getGameBySlug, filteredGames } = useContext(GamesContext);

  const [game, setGame] = useState<Game | null>(null);

  // On filteredGames update, set current game
  // Could be replaced with loadingContext
  useEffect(() => {
    if (!filteredGames) return;

    setGame(getGameBySlug(params.gameId));
  }, [filteredGames]);

  // Handle back button click
  // Navigate back to lobby
  const handleBackClick = () => {
    navigate("/");
  };

  if (!game) return <Loading />;

  return (
    <div style={styles.root}>
      {/* Background image */}
      <img
        src={game.game_background}
        alt={game.title}
        style={styles.background}
      />
      {/* Content */}
      <div style={styles.containerBackground} className="container">
        <div style={styles.container}>
          {/* Backbutton */}
          <button style={styles.backButton} onClick={handleBackClick}>
            <i style={styles.arrowLeft} />
            <p>back</p>
          </button>

          {/* Title */}
          <div style={styles.title}>
            <h1>{game.title}</h1>
          </div>

          {/* Content */}
          <div
            style={styles.content}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(game.content ?? ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameOverview;
