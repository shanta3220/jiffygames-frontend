import { useRef, useEffect, useState } from "react";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGameList from "../../components/FeaturedGameList/FeaturedGameList";
import { getGameList } from "../../scripts/game-api";

function HomePage() {
  const [game, setGame] = useState();
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const games = await getGameList();
        setGame(games[0]);
        setGames(games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameList();
  }, []);
  return (
    <main className="home-main">
      <Hero game={game} />
      {games && <FeaturedGameList setGame={setGame} games={games} />}
    </main>
  );
}

export default HomePage;
