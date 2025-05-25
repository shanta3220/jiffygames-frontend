import GameList from "../../components/GamesList/GameList";

function LeaderboardsPage({ games }) {
  const title = "Leaderboards";

  if (!games) {
    return null;
  }

  return (
    <main className="main-game-list">
      <h1>{title}</h1>
      {<GameList games={games} />}
    </main>
  );
}

export default LeaderboardsPage;
