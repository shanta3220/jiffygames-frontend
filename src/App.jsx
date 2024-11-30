import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LeaderboardPage from "./components/LeaderboardPage/LeaderboardPage";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/" element={<GamesPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />

        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route
          path="/leaderboards/:leaderboardId"
          element={<LeaderboardPage />}
        />
        <Route path="/register" element={<LoginRegisterPage />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/users/" element={<UserProfilePages />} />
        <Route path="/users/:userId" element={<UserProfilePages />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function LeaderboardsPage() {
  return (
    <div>
      <p>This is LeaderboardsPage</p>
    </div>
  );
}
function UserProfilePages() {
  return (
    <div>
      <p>This is UserProfilePage</p>
    </div>
  );
}
