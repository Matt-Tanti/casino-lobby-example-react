import { useContext, useEffect } from "react";
import defaultGames from "../../constants/games.json";
import { GamesContext } from "../../contexts/gamesContext";
import { Styles } from "../../types/modelTypes";
import Logo from "../Common/Logo";
import SearchBar from "../Common/SearchBar";

const styles: Styles = {
  header: {
    maxWidth: "300px",
  },
};

const Lobby = () => {
  const { filteredGames, setGames } = useContext(GamesContext);

  useEffect(() => {
    if (!defaultGames) return;

    setGames(defaultGames);
  }, []);

  return (
    <div>
      <div style={styles.header}>
        <Logo />
        <SearchBar />
      </div>
    </div>
  );
};

export default Lobby;
