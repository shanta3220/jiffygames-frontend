import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";
import { getGameInfo } from "../../scripts/GameApi";
import "./GamePage.scss";
import { useEffect, useState } from "react";
import GameDetails from "../../components/GameDetails/GameDetails";
import VideoComments from "../../components/Comments/Comments";
import Comments from "../../components/Comments/Comments";

export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const gameInfo = await getGameInfo(gameId);

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

  return (
    <main className="main-game">
      <section className="game-holder">
        <UnityPlayer gameInfo={gameInfo} />
      </section>
      <section className="main-game__details">
        <GameDetails gameInfo={gameInfo} />
      </section>
      <section className="main-game__comments">
        <Comments
          comments={gameInfo.comments}
          handlePostNewComment={() => {
            console.log("clicked post new comment");
          }}
          handleDeleteComment={() => {
            console.log("clicked delete comment");
          }}
        />
      </section>
    </main>
  );
}
