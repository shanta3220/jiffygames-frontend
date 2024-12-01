import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams, useNavigate } from "react-router-dom";
import { getGameInfo, getGameList, getMyUserId } from "../../scripts/GameApi";
import "./GamePage.scss";
import { useEffect, useState } from "react";
import GameDetails from "../../components/GameDetails/GameDetails";
import Comments from "../../components/GameComments/GameComments";
import GameList from "../../components/GamesList/GameList";

export default function GamePage() {
  const { gameId } = useParams();
  const [userId, setUserId] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [games, setGames] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const userId = getMyUserId();

        if (!userId) {
          navigate("/register");
          alert("You need to login with an account");
        } else {
          setUserId(userId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedUser();
  }, [navigate]);

  const handleUnityReady = (sendMessageFunction) => {
    // Store the sendMessage function from UnityPlayer
    setSendMessage(() => sendMessageFunction);
  };

  const handleUnityBlur = () => {
    if (sendMessage) {
      sendMessage("Datacontroller", "CaptureKeyboardInputs", 0);
    }
  };

  const handleUnityFocus = () => {
    if (sendMessage) {
      sendMessage("Datacontroller", "CaptureKeyboardInputs", 1);
    }
  };

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

  const handlePostNewComment = (comment) => {
    alert("clicked post new comment");
  };

  const handleDeleteComment = (comment) => {
    alert("clicked post new comment");
  };

  return (
    <main className="main-game">
      <section className="game-holder">
        <UnityPlayer
          gameInfo={gameInfo}
          tabIndex={1}
          key={gameId}
          onUnityReady={handleUnityReady}
          handleUnityFocus={handleUnityFocus}
        />
      </section>
      <section className="main-game__details">
        <GameDetails gameInfo={gameInfo} />
      </section>
      <section className="main-game__comments" tabIndex={2}>
        <Comments
          comments={gameInfo.comments}
          handlePostNewComment={handlePostNewComment}
          handleDeleteComment={handleDeleteComment}
          handleCommentFocus={handleUnityBlur}
          userId={userId}
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
