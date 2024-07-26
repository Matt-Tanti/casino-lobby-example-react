import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Unknown from "./views/Common/Unknown";
import Game from "./views/Games/Game";
import Lobby from "./views/Lobby/Lobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/403" element={<Unknown />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/" element={<Navigate to="/lobby" replace />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
