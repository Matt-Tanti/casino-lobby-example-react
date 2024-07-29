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
          <Route path="/404" element={<Unknown />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game/:gameId" element={<GameOverview />} />
          <Route path="/" element={<Navigate to="/lobby" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </GamesProvider>
  );
}

export default App;
