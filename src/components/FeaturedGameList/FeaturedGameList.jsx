import { useNavigate } from "react-router-dom";

function FeaturedGamesList({ setGame, games }) {
  const navigate = useNavigate("");

  return (
    <section className="featured-games">
      <button className="button">VIEW ALL</button>
      <ul className="featured-games__list">
        {games.map((game) => (
          <li key={game.id} className="featured-games__item">
            <div className="featured-games__item-contents">
              <img
                src={`${game.image_path}`}
                alt={`${game.game_name} image`}
                className="featured-games__item-image"
                onClick={() => {
                  setGame(game);
                }}
              />
              <p className="featured-games__item-title">{game.game_name}</p>

              <div className="featured-games__preview-button-container">
                <button
                  className="button"
                  onClick={() => {
                    navigate(`/games/${game.id}`);
                  }}
                >
                  Play
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedGamesList;
