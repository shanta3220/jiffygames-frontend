import React from "react";
import "./GameDetails.scss";
function GameDetails({ gameInfo }) {
  return (
    <div className="game-details">
      <div className="game-details__info">
        <div className="game-details__info-group">
          <h2 className="game-details__title">DESCRIPTION</h2>
          <p className="game-details__text">{gameInfo.description}</p>
        </div>
        <div className="game-details__info-group">
          <h2 className="game-details__title">HOW TO PLAY?</h2>
          <p className="game-details__text">{gameInfo.instruction}</p>
        </div>
      </div>
      <div className="game-details__info">
        <div className="game-details__info-group--category">
          <h2 className="game-details__title">CATEGORY:</h2>
          <p className="game-details__text">{gameInfo.category}</p>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
