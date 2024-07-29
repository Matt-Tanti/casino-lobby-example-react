import { useContext } from "react";
import styled from "styled-components";
import { GamesContext } from "../../contexts/gamesContext";
import { Game, Styles } from "../../types/modelTypes";
import Loading from "../Common/Loading";
import Logo from "../Common/Logo";
import SearchBar from "../Common/SearchBar";
import GameThumbnail from "../Games/GameThumbnail";

const styles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
  },
  header: {
    maxWidth: "300px",
    paddingBottom: "2rem",
  },
};

// React does not natively support media queries...
const DivWithMedia = styled.div`
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(4, 1fr); /* 4 columns by default */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3 columns for screens smaller than 1200px */
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 columns for screens smaller than 800px */
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr; /* 1 column for screens smaller than 500px */
  }
`;

const Lobby = () => {
  const { filteredGames } = useContext(GamesContext);

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <Logo />
        <SearchBar />
      </div>

      {filteredGames ? (
        <DivWithMedia>
          {filteredGames.map((filteredGame: Game) => (
            <GameThumbnail key={filteredGame.id} game={filteredGame} />
          ))}
        </DivWithMedia>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Lobby;
