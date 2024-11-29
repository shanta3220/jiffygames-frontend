import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";
import { getGameInfo } from "../../scripts/GameApi";
import "./GamePage.scss";
import { useEffect, useState } from "react";
import GameDetails from "../../components/GameDetails/GameDetails";

export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [fullscreenFunction, setFullscreenFunction] = useState(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const gameInfo = await getGameInfo(gameId);
        console.log(gameInfo);
        setGameInfo(gameInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameInfo();
  }, [gameId]);

  if (gameInfo == null) {
    return (
      <main className="main-game">
        <p>Loading the game info...</p>
      </main>
    );
  }

  const handleFullscreenClick = () => {
    if (fullscreenFunction) {
      fullscreenFunction();
    }
  };
  return (
    <main className="main-game">
      <section className="game-holder">
        {<UnityPlayer gameInfo={gameInfo} />}
      </section>
      <section className="main-game__details">
        {<GameDetails gameInfo={gameInfo} />}
      </section>
    </main>
  );
}
