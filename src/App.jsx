import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/games" element={<GamesPage />}></Route>{" "}
        <Route path="/leaderboards" element={<LeaderboardsPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/user-profile" element={<UserProfilePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function HomePage() {
  return (
    <div>
      <p>This is HomePage</p>
    </div>
  );
}

function GamesPage() {
  return (
    <div>
      <p>This is GamesPage</p>
    </div>
  );
}

function LeaderboardsPage() {
  return (
    <div>
      <p>This is LeaderboardsPage</p>
    </div>
  );
}

function RegisterPage() {
  return (
    <div>
      <p>This is RegisterPage</p>
    </div>
  );
}
function LoginPage() {
  return (
    <div>
      <p>This is HomePage</p>
    </div>
  );
}
function UserProfilePage() {
  return (
    <div>
      <p>This is UserProfilePage</p>
    </div>
  );
}
