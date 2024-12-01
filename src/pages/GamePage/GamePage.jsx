import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";
import { getGameInfo, getGameList } from "../../scripts/GameApi";
import "./GamePage.scss";
import { useEffect, useState } from "react";
import GameDetails from "../../components/GameDetails/GameDetails";
import VideoComments from "../../components/GameComments/GameComments";
import Comments from "../../components/GameComments/GameComments";
import GameList from "../../components/GamesList/GameList";

export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGameList();

        setGames(games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

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
        <UnityPlayer gameInfo={gameInfo} tabIndex={1} key={gameId} />
      </section>
      <section className="main-game__details">
        <GameDetails gameInfo={gameInfo} />
      </section>
      <section className="main-game__comments" tabIndex={2}>
        <Comments
          comments={gameInfo.comments}
          handlePostNewComment={(comment) => {
            alert("clicked post new comment");
          }}
          handleDeleteComment={() => {
            console.log("clicked delete comment");
          }}
        />
      </section>
      {games && (
        <section className="main-games">
          <GameList games={games} />
        </section>
      )}
    </main>
  );
}
