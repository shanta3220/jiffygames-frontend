import { useState, useEffect } from "react";
import GameList from "../../components/GamesList/GameList";
import { getUserGames } from "../../scripts/game-api";
import { useParams } from "react-router-dom";

function UserGamesPage() {
  const { userId } = useParams();

  const [title, setTitle] = useState("The user doesn't have any games");
  const [games, setGames] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchGames = async () => {
        let data = await getUserGames(userId);
        if (data) {
          setGames(data);
          setTitle(`Games played by ${data[0].username}`);
        }
      };
      fetchGames();
    }
  }, [userId]);

  return (
    <main className="main-game-list">
      <h1>{title}</h1>
      {!games && <p>Loading...</p>}
      {games && <GameList games={games} />}
    </main>
  );
}

export default UserGamesPage;
