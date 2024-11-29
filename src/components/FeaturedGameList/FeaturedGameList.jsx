import { useNavigate } from "react-router-dom";

function FeaturedGamesList({ setVideoPath, games }) {
  const navigate = useNavigate("");

  return (
    <section className="featured-games">
      <button className="button">VIEW ALL</button>
      <ul className="featured-games__list">
        {games.map((game) => (
          <li key={game.id} className="featured-games__item">
            <div className="featured-games__item-contents">
              <img
                src={`/images/${game.project_name}.png`}
                alt={`${game.game_name} image`}
                className="featured-games__item-image"
                onClick={() => {
                  setVideoPath(`/trailers/${game.project_name}.mp4`);
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
