import { useRef, useEffect, useState } from "react";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGamesList from "../../components/FeaturedGamesList/FeaturedGamesList";
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
      {games && <FeaturedGamesList setVideoPath={setVideoPath} games={games} />}
    </main>
  );
}

export default HomePage;
