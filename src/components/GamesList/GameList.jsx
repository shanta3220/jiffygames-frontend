import "./GameList.scss";
import { useNavigate } from "react-router-dom";

function GameList({ games }) {
  const navigate = useNavigate("");

  return (
    <section className="all-game">
      <ul className="all-game__list">
        {games.map((game) => (
          <li
            key={game.id}
            className="all-game__item"
            onClick={() => {
              if (!window.location.pathname.includes("/leaderboards")) {
                navigate(`/games/${game.id}`);
              } else {
                navigate(`/leaderboards/${game.id}`);
              }
            }}
          >
            <div className="all-game__item-contents">
              <img
                src={`/images/${game.project_name}.png`}
                alt={`${game.game_name} image`}
                className="all-game__item-image"
              />
              <p className="all-game__item-title">{game.game_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GameList;
