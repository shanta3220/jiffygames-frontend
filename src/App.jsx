import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { useState } from "react";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import LeaderboardsPage from "./pages/LeaderboardsPage/LeaderboardsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import UserGamesPage from "./pages/UserGamesPage/UserGamesPage";
function App() {
  const [avatar, setAvatar] = useState("");

  return (
    <BrowserRouter>
      <Header avatar={avatar} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />{" "}
        <Route path="/games/:gameId/" element={<GamePage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route
          path="/leaderboards/:leaderboardId"
          element={<LeaderboardPage />}
        />
        <Route path="/register" element={<LoginRegisterPage />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/users" element={<EditUserPage setAvatar={setAvatar} />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/user-games/:userId" element={<UserGamesPage />} />
        <Route
          path="/user-profile"
          element={<EditUserPage setAvatar={setAvatar} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
