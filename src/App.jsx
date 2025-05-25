import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import LeaderboardsPage from "./pages/LeaderboardsPage/LeaderboardsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import UserGamesPage from "./pages/UserGamesPage/UserGamesPage";
import { getGameList } from "./scripts/game-api";
import LoadingTextAfterDelay from "./components/LoadingTextAfterDelay/LoadingTextAfterDelay";

function App() {
  const [avatar, setAvatar] = useState("");
  const [games, setGames] = useState(null);
  const [game, setGame] = useState(null);
  const [readyToShowApp, setReadyToShowApp] = useState(false);

  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const games = await getGameList();
        setGames(games);
        setGame(games?.[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameList();
  }, []);

  return (
    <BrowserRouter>
      <Header avatar={avatar} />
      <LoadingTextAfterDelay
        games={games}
        readyToShowApp={readyToShowApp}
        setReadyToShowApp={setReadyToShowApp}
      />

      {readyToShowApp && (
        <Routes>
          <Route
            path="/"
            element={<HomePage game={game} games={games} setGame={setGame} />}
          />
          <Route path="/games" element={<GamesPage games={games} />} />{" "}
          <Route path="/games/:gameId/" element={<GamePage games={games} />} />
          <Route
            path="/leaderboards"
            element={<LeaderboardsPage games={games} />}
          />
          <Route
            path="/leaderboards/:leaderboardId"
            element={<LeaderboardPage />}
          />
          <Route path="/register" element={<LoginRegisterPage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route
            path="/users"
            element={<EditUserPage setAvatar={setAvatar} />}
          />
          <Route path="/users/:userId" element={<UserProfilePage />} />
          <Route path="/user-games/:userId" element={<UserGamesPage />} />
          <Route
            path="/user-profile"
            element={<EditUserPage setAvatar={setAvatar} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
