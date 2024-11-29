import "./GameList.scss";
import { useNavigate } from "react-router-dom";

function GameList({ games }) {
  const navigate = useNavigate("");

  return (
    <section className="all-game">
      <ul className="all-game__list">
        {games.map((game) => (
          <li
            key={game.gameName}
            className="all-game__item"
            onClick={() => {
              navigate(`/games/${game.id}`);
            }}
          >
            <div className="all-game__item-contents">
              <img
                src={`/images/${game.projectName}.png`}
                alt={`${game.gameName} image`}
                className="all-game__item-image"
              />
              <p className="all-game__item-title">{game.gameName}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GameList;
