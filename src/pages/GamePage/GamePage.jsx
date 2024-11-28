import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";
import fullScreenIcon from "../../assets/icons/icon_fullscreen.png";
import likeIcon from "../../assets/icons/icon_like.png";
import shareIcon from "../../assets/icons/icon_share.png";
import { getGameInfo } from "../../scripts/GameApi";
import "./GamePage.scss";
import { useEffect, useState } from "react";

export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    try {
      const gameInfo = getGameInfo(gameId);
      console.log(gameInfo);
      setGameInfo(gameInfo);
    } catch (error) {
      console.error(error);
    }
  }, [gameId]);

  if (gameInfo == null) {
    return (
      <main className="main-game">
        <p>Loading the game info...</p>
      </main>
    );
  }
  return (
    <main className="main-game">
      <section className="game-holder">
        <UnityPlayer gameProjectName={gameInfo.projectName} />
        <div className="game-interact">
          <div className="game__title-text"></div>
          <div className="game-interact__social">
            <img
              src={shareIcon}
              alt=""
              className="game-interact__share-image"
            />
            <img src={likeIcon} alt="" className="game-interact__like-image" />
          </div>
        </div>
      </section>
    </main>
  );
}
