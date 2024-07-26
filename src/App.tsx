import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GamesProvider } from "./contexts/gamesContext";
import Unknown from "./views/Common/Unknown";
import GameOverview from "./views/Games/GameOverview";
import Lobby from "./views/Lobby/Lobby";

function App() {
  return (
    <GamesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/403" element={<Unknown />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/" element={<Navigate to="/lobby" replace />} />
          <Route path="/game/:gameId" element={<GameOverview />} />
        </Routes>
      </BrowserRouter>
    </GamesProvider>
  );
}

export default App;
