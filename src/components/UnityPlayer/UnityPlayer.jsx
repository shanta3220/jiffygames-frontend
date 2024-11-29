import { useEffect, Fragment, useState, useCallback, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import "./UnityPlayer.scss";
import fullScreenIcon from "../../assets/icons/icon_fullscreen.png";
import likeIcon from "../../assets/icons/icon_like.png";
import shareIcon from "../../assets/icons/icon_share.png";
import returnIcon from "../../assets/icons/icon_return.png";
import loadingGif from "../../assets/images/loading.gif";

export default function UnityPlayer({ gameInfo }) {
  const gameProjectName = gameInfo.projectName;

  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuit, setIsQuit] = useState(false);
  const [userName, setUserName] = useState();
  const [score, setScore] = useState();
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );
  const absoluteFilePath = `/build/${gameProjectName}/Build/${gameProjectName}`;

  // Prevent unity memory logs spam message
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

  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
    addEventListener,
    removeEventListener,
    unload,
  } = useUnityContext({
    loaderUrl: `${absoluteFilePath}.loader.js`,
    dataUrl: `${absoluteFilePath}.data.gz`,
    frameworkUrl: `${absoluteFilePath}.framework.js.gz`,
    codeUrl: `${absoluteFilePath}.wasm.gz`,
    productName: "My Game",
    productVersion: "1.0.0",
    companyName: "Developer",
  });

  const handleGameOver = useCallback((userName, score) => {
    setIsGameOver(true);
    setUserName(userName);
    setScore(score);
    console.log("Game Over");
  }, []);

  const handleSetScore = useCallback((userName, score) => {
    setUserName(userName);
    setScore(score);
    console.log("SetScore");
  }, []);

  const handleQuit = useCallback((userName, score) => {
    setIsQuit(true);
    setUserName(userName);
    setScore(score);
  }, []);

  function handleScore() {
    sendMessage("GameController", "SetScore", 100);
  }

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  async function handleClickReturn() {
    try {
      if (unload) await unload(); // Ensure Unity is unloaded before navigating away
    } finally {
      navigate("/");
    }
  }

  // functions to unload, register/unregister events
  useEffect(() => {
    const makeEventsPassive = () => {
      const unityCanvas = canvasRef.current;
      // if (unityCanvas) {
      //   unityCanvas.addEventListener("touchstart", (e) => e.preventDefault(), {
      //     passive: false,
      //   });
      //   unityCanvas.addEventListener("touchmove", (e) => e.preventDefault(), {
      //     passive: false,
      //   });
      // }
    };

    // Run after Unity is loaded to modify event listeners
    if (isLoaded) {
      makeEventsPassive();
    }

    addEventListener("GameOver", handleGameOver);
    addEventListener("SetScore", handleSetScore);
    addEventListener("Quit", handleQuit);

    return () => {
      const removeAllListeners = async () => {
        if (isLoaded && unload) {
          const unityCanvas = canvasRef.current;
          // if (unityCanvas) {
          //   unityCanvas.removeEventListener("touchstart", (e) =>
          //     e.preventDefault()
          //   );
          //   unityCanvas.removeEventListener("touchmove", (e) =>
          //     e.preventDefault()
          //   );
          // }
          await unload(); // Ensure unloading happens in the cleanup
        }
      };
      removeAllListeners();
      // Removing Unity event listeners as well
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("SetScore", handleSetScore);
      removeEventListener("Quit", handleQuit);
    };
  }, [
    isLoaded,
    unload,
    addEventListener,
    removeEventListener,
    handleGameOver,
    handleSetScore,
    handleQuit,
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
      <div className="game__container">
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
            <Unity
              className="game__unity-player"
              style={{ visibility: isLoaded ? "visible" : "none" }}
              unityProvider={unityProvider}
              disabledCanvasEvents={["dragstart", "scroll"]}
              ref={canvasRef}
            />
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
            <h1 className="game__title-text">{gameInfo.gameName}</h1>
          </div>
          <div className="game-interact">
            <div className="game-interact__social">
              <img
                src={shareIcon}
                alt=""
                className="game-interact__icon"
                onClick={handleClickReturn}
              />
              <div className="game-interact__like">
                <img
                  src={likeIcon}
                  alt="Like Icon"
                  className="game-interact__icon"
                />
                <p className="game-interact__like-text">{gameInfo.like}</p>
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
          {userName && score && (
            <p>{`Set Score ${userName}! You've scored ${score} points.`}</p>
          )}
        </div>
      </div>
    </div>
  );
}
