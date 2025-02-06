import { useState, useEffect } from "react";
import GameList from "../../components/GamesList/GameList";
import { getGameList } from "../../scripts/game-api";

function LeaderboardsPage() {
  const title = "Leaderboards";
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGameList();

        setGames(games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  return (
    <main className="main-game-list">
      <h1>{title}</h1>
      {<GameList games={games} />}
    </main>
  );
}

export default LeaderboardsPage;
