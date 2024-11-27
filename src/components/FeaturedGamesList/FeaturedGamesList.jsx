import React from "react";
import { Link } from "react-router-dom";
function FeaturedGamesList({ games }) {
  games = [
    {
      gameName: "RikoTheAventurer",
    },
  ];

  console.log(games[0].gameName);
  return (
    <section className="featured-games">
      <ul className="featured-games__list">
        {games.map((game) => (
          <li key={game.gameName} className="featured-games__item">
            <Link
              to={`/games/${game.gameName}`}
              className="featured-games__link"
            >
              <div className="featured-games__item-contents">
                <img src={`/images/${game.gameName}.png`} alt="" />
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
