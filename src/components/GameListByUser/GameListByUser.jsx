import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FindGames } from "../../scripts/GameApi";

function GameListByUser({ userId }) {
  const navigate = useNavigate("");
  const [games, setGames] = useState(null);

  useEffect(() => {
    const findGames = async () => {
      const data = await FindGames(userId);

      setGames(data);
    };
    findGames();
  }, [userId]);

  return (
    <section className="user-game__item">
      <ul className="user-game__item-list">
        {games &&
          games.map((game) => (
            <li
              key={game.game_id}
              className="user-game__item"
              onClick={() => {
                if (window.location.pathname.includes("/leaderboards")) {
                  navigate(`/leaderboards/${game.id}`);
                } else {
                  navigate(`/games/${game.id}`);
                }
              }}
            >
              <div>
                <img
                  src={game.image_path}
                  alt={`${game.game_name} image`}
                  className="user-game__item__item-image"
                  style={d}
                />
              </div>
            </li>
          ))}
      </ul>
      <button className="button">VIEW ALL</button>
    </section>
  );
}

export default GameListByUser;
