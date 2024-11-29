import { useRef, useEffect, useState } from "react";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGameList from "../../components/FeaturedGameList/FeaturedGameList";
import { getGameList } from "../../scripts/GameApi";

function HomePage() {
  const [videoPath, setVideoPath] = useState("/trailers/RikoTheAdventurer.mp4");
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const games = await getGameList();

        setGames(games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameList();
  }, []);
  return (
    <main className="home-main">
      <Hero videoPath={videoPath} />
      {games && <FeaturedGameList setVideoPath={setVideoPath} games={games} />}
    </main>
  );
}

export default HomePage;
