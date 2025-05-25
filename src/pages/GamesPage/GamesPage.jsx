import GameList from "../../components/GamesList/GameList";
import "./GamesPage.scss";

function GamesPage({ games }) {
  const title = "All Games";

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

export default GamesPage;
