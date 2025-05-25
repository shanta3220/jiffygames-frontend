import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGameList from "../../components/FeaturedGameList/FeaturedGameList";

function HomePage({ game, games, setGame }) {
  if (!games || !game) {
    return null;
  }
  return (
    <main className="home-main">
      <Hero game={game} />
      <FeaturedGameList setGame={setGame} games={games} />
    </main>
  );
}

export default HomePage;
