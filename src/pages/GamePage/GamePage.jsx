import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGameInfo,
  getGameList,
  getMyUserId,
  postComment,
  deleteComment,
} from "../../scripts/GameApi";
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

  const [changeCommentId, setChangeCommentId] = useState([]);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const userId = getMyUserId();

        if (!userId) {
          navigate("/register");
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
      sendMessage("DataController", "CaptureKeyboardInputs", 0);
    }
  };

  const handleUnityFocus = () => {
    if (sendMessage) {
      sendMessage("DataController", "CaptureKeyboardInputs", 1);
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
  }, [gameId, changeCommentId]);

  if (gameInfo == null) {
    return (
      <main className="main-game">
        <p>Loading the game info...</p>
      </main>
    );
  }

  const handlePostNewComment = async (comment) => {
    try {
      const commentObject = {
        message: comment,
        user_id: userId,
        game_id: gameId,
      };
      // Await the response from PostComment
      const data = await postComment(commentObject);
      setChangeCommentId(data.id);
    } catch (error) {
      console.error("Error posting a new comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
    } finally {
      setChangeCommentId(null);
    }
  };

  return (
    <main className="main-game">
      <section className="game-holder">
        <UnityPlayer
          gameInfo={gameInfo}
          tabIndex={1}
          key={gameInfo.id}
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
