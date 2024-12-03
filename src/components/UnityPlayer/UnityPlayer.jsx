import { useEffect, Fragment, useState, useCallback, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import "./UnityPlayer.scss";
import fullScreenIcon from "../../assets/icons/icon_fullscreen.png";
import likeIcon from "../../assets/icons/icon_like.png";
import shareIcon from "../../assets/icons/icon_share.png";
import returnIcon from "../../assets/icons/icon_return.png";
import loadingGif from "../../assets/images/loading.gif";
import {
  getLeaderboard,
  getUserScore,
  postUserScore,
  likeGame,
} from "../../scripts/game-api";
import SocialShareModal from "../SocialShareModal/SocialShareModal";

export default function UnityPlayer({
  gameInfo,
  onUnityReady,
  handleUnityFocus,
}) {
  const gameProjectName = gameInfo.project_name;
  const { gameId } = useParams();

  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [score, setScore] = useState();
  const [likes, setLikes] = useState(gameInfo.like_count);
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href || "");
    }
  }, []);

  //Prevent unity memory logs spam message
  useEffect(() => {
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;

    const suppressAllLogs = () => {};
    console.log = suppressAllLogs;
    console.warn = suppressAllLogs;
    return () => {
      console.log = originalConsoleLog;
      console.warn = originalConsoleWarn;
    };
  }, []);

  const absoluteFilePath = `${gameInfo?.build_path}/Build/${gameProjectName}`;
  const {
    unityProvider,
    sendMessage,
    isLoaded,
    loadingProgression,
    requestFullscreen,
    addEventListener,
    removeEventListener,
    unload,
  } = useUnityContext({
    loaderUrl: `${absoluteFilePath}.loader.js`,
    dataUrl: `${absoluteFilePath}.data.unityweb`,
    frameworkUrl: `${absoluteFilePath}.framework.js.unityweb`,
    codeUrl: `${absoluteFilePath}.wasm.unityweb`,
    productName: "My Game",
    productVersion: "1.0.0",
    companyName: "Developer",
  });
  const [unityKey, setUnityKey] = useState(gameId);

  getLeaderboard;
  useEffect(() => {
    setUnityKey(gameId);
  }, [gameId]);

  useEffect(() => {
    if (isLoaded) {
      onUnityReady(sendMessage);
    }
  }, [isLoaded, sendMessage, onUnityReady]);

  useEffect(() => {
    window.addEventListener("focus", handleUnityFocus);
    return () => {
      window.removeEventListener("focus", handleUnityFocus);
    };
  }, [handleUnityFocus]);

  const handleSetScore = useCallback((newScore) => {
    console.log(newScore);
    if (score != newScore && newScore != 0) {
      setScore(newScore);
      postUserScore(gameId, newScore);
    }
  }, []);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  async function handleClickReturn() {
    try {
      if (unload) await unload();
    } finally {
      navigate("/");
    }
  }

  const handlelikeGame = async () => {
    try {
      const data = await likeGame(gameId);
      if (data) {
        setLikes(data);
      }
    } catch (error) {
      console.error("Error posting a new comment:", error);
    }
  };

  useEffect(() => {
    const makeEventsPassive = () => {
      const unityCanvas = canvasRef.current;
      if (unityCanvas) {
        unityCanvas.addEventListener("touchstart", (e) => e.preventDefault(), {
          passive: false,
        });
        unityCanvas.addEventListener("touchmove", (e) => e.preventDefault(), {
          passive: false,
        });
      }
    };

    // Run after Unity is loaded to modify event listeners, set the current user score
    if (isLoaded) {
      makeEventsPassive();
    }

    const initializeScore = async () => {
      if (sendMessage && isLoaded) {
        const intialScore = await getUserScore(gameId);
        sendMessage("DataController", "SendScoreToGame", intialScore);
      }
    };

    const initScore = () => {
      initializeScore();
    };
    initScore();
    addEventListener("SetScore", handleSetScore);

    return () => {
      const removeAllListeners = async () => {
        if (isLoaded && unload) {
          const unityCanvas = canvasRef.current;
          if (unityCanvas) {
            unityCanvas.removeEventListener("touchstart", (e) =>
              e.preventDefault()
            );
            unityCanvas.removeEventListener("touchmove", (e) =>
              e.preventDefault()
            );
          }
          await unload(); // Ensure unloading happens in the cleanup
        }
      };
      removeAllListeners();
      removeEventListener("SetScore", handleSetScore);
    };
  }, [
    isLoaded,
    unload,
    addEventListener,
    removeEventListener,
    handleSetScore,
    sendMessage,
    gameId,
  ]);

  useEffect(() => {
    const updateDevicePixelRatio = function () {
      setDevicePixelRatio(window.devicePixelRatio);
    };
    const mediaMatcher = window.matchMedia(
      `screen and (resolution: ${devicePixelRatio}dppx)`
    );
    mediaMatcher.addEventListener("change", updateDevicePixelRatio);
    return function () {
      mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
    };
  }, [devicePixelRatio]);

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="game">
      <div className="game__container ">
        {isLoaded === false && (
          <div className="game__loading-overlay">
            <img src={loadingGif} alt="" />
            <p className="loading-overlay__text">
              Loading... ({loadingPercentage}%)
            </p>
          </div>
        )}
        {
          <Fragment>
            <div onClick={handleUnityFocus}>
              <Unity
                key={unityKey}
                className="game__unity-player"
                style={{ visibility: isLoaded ? "visible" : "none" }}
                unityProvider={unityProvider}
                disabledCanvasEvents={["dragstart", "scroll"]}
                ref={canvasRef}
              />
            </div>
          </Fragment>
        }
        <div
          className="game__title-and-interaction"
          style={{ visibility: isLoaded ? "visible" : "none" }}
        >
          <div className="game__title-and-return">
            <img
              src={returnIcon}
              alt="Return icon"
              className="game-interact__icon"
              onClick={handleClickReturn}
            />
            <p className="game__title-text">{gameInfo.game_name}</p>
          </div>
          <div className="game-interact">
            <p>{`Score: ${score ? score : 0}`}</p>
            <div className="game-interact__social">
              <img
                src={shareIcon}
                alt=""
                className="game-interact__icon"
                onClick={() => setOpen(true)}
              />
              <div className="game-interact__like">
                <img
                  src={likeIcon}
                  alt="Like Icon"
                  className="game-interact__icon"
                  onClick={handlelikeGame}
                />
                <p className="game-interact__like-text">{likes}</p>
              </div>
            </div>
            <div>
              <img
                src={fullScreenIcon}
                alt=""
                className="game-interact__icon--fullscreen"
                onClick={handleClickEnterFullscreen}
              />
            </div>
          </div>
        </div>
      </div>
      <SocialShareModal open={open} setOpen={setOpen} currentUrl={currentUrl} />
    </div>
  );
}
