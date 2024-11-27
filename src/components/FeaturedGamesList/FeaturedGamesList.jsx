import React from "react";
import { Link } from "react-router-dom";
function FeaturedGamesList({ games }) {
  games = [
    {
      gameName: "Riko: The Aventurer",
      projectName: "RikoTheAventurer",
    },
  ];

  return (
    <section className="featured-games">
      <button className="button">VIEW ALL</button>
      <ul className="featured-games__list">
        {games.map((game) => (
          <li key={game.gameName} className="featured-games__item">
            <Link
              to={`/games/${game.projectName}`}
              className="featured-games__link"
            >
              <div className="featured-games__item-contents">
                <img
                  src={`/images/${game.projectName}.png`}
                  alt=""
                  className="featured-games__item-image"
                />
                <p className="featured-games__item-title">{game.gameName}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedGamesList;
