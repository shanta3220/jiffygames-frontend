import React from "react";
import "./GameDetails.scss";
import { Navigate, useNavigate } from "react-router-dom";

function GameDetails({ gameInfo }) {
  const navigate = useNavigate();

  function handleViewLeaderboardClick() {
    navigate(`/leaderboards/${gameInfo.id}`);
  }
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
      <div className="game-details__info--button-container">
        <button className="button" onClick={handleViewLeaderboardClick}>
          View Leaderboard
        </button>
      </div>
    </div>
  );
}

export default GameDetails;
