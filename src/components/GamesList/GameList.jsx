import LoadingTextAfterDelay from "../LoadingTextAfterDelay/LoadingTextAfterDelay";
import "./GameList.scss";
import { useNavigate } from "react-router-dom";

function GameList({ games }) {
  const navigate = useNavigate("");

  return (
    <section className="all-game">
      {games && (
        <ul className="all-game__list">
          {games.map((game) => {
            const gameId = game.id ?? game.game_id;
            return (
              <li
                key={gameId}
                className="all-game__item"
                onClick={() => {
                  if (!window.location.pathname.includes("/leaderboards")) {
                    navigate(`/games/${gameId}`);
                  } else {
                    navigate(`/leaderboards/${gameId}`);
                  }
                }}
              >
                <div className="all-game__item-contents">
                  <img
                    src={game.image_path}
                    alt={`${game.game_name} image`}
                    className="all-game__item-image"
                  />
                  <p className="all-game__item-title">{game.game_name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {<LoadingTextAfterDelay games={games} />}
    </section>
  );
}

export default GameList;
