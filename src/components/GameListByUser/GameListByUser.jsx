import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserGames } from "../../scripts/game-api";
import "./GameListByUser.scss";

function GameListByUser({ userId }) {
  const navigate = useNavigate();
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      let data = await getUserGames(userId);
      if (data.length > 2) {
        data = data.slice(0, 2); // Fixed: Use slice instead of splice to avoid modifying original array
      }
      setGames(data);
    };
    fetchGames();
  }, [userId]);

  return (
    <section className="user-profile-game">
      <h2 className="user-profile-game__title">Playing Games</h2>
      <ul className="user-profile-game__item-list">
        {games &&
          games.map((game) => (
            <li
              key={game.game_id}
              className="user-profile-game__item"
              onClick={() => {
                navigate(`/games/${game.game_id}`);
              }}
            >
              <div>
                <img
                  src={game.image_path}
                  alt={`${game.game_name} image`}
                  className="user-profile-game__item-image"
                />
              </div>
            </li>
          ))}
      </ul>
      <Link to={`/user-games/${userId}`}>
        <button className="button">VIEW ALL</button>
      </Link>
    </section>
  );
}

export default GameListByUser;
