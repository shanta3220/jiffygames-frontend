import React from "react";
import { useNavigate } from "react-router-dom";

function FeaturedGamesList({ setVideoPath, games }) {
  const navigate = useNavigate("");

  return (
    <section className="featured-games">
      <button className="button">VIEW ALL</button>
      <ul className="featured-games__list">
        {games.map((game) => (
          <li key={game.gameName} className="featured-games__item">
            <div className="featured-games__item-contents">
              <img
                src={`/images/${game.projectName}.png`}
                alt={`${game.gameName} image`}
                className="featured-games__item-image"
                onClick={() => {
                  setVideoPath(`/trailers/${game.projectName}.mp4`);
                }}
              />
              <p className="featured-games__item-title">{game.gameName}</p>

              <div className="featured-games__preview-button-container">
                <button
                  className="button"
                  onClick={() => {
                    navigate(`/games/${game.projectName}`);
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
