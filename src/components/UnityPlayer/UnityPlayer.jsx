import { useEffect, Fragment, useState, useCallback, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";

export default function UnityPlayer({ gameProjectName }) {
  const navigate = useNavigate();
  const canvasRef = useRef();
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

  async function handleClickBack() {
    try {
      if (unload) await unload();
    } finally {
      navigate("/");
    }
  }

  // functions to unload, register/unregister events
  useEffect(() => {
    // Function to mark touchstart, wheel, and touchmove listeners as passive
    const makeEventsPassive = () => {
      const unityCanvas = document.querySelector("canvas");
      if (unityCanvas) {
        // Mark 'touchstart', 'wheel', and 'touchmove' events as passive
        unityCanvas.addEventListener("touchstart", (e) => e.preventDefault(), {
          passive: true,
        });
        unityCanvas.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: true,
        });
        unityCanvas.addEventListener("touchmove", (e) => e.preventDefault(), {
          passive: true,
        });
      }
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
        try {
          const unityCanvas = document.querySelector("canvas");
          if (unityCanvas) {
            unityCanvas.removeEventListener("touchstart", (e) =>
              e.preventDefault()
            );
            unityCanvas.removeEventListener("wheel", (e) => e.preventDefault());
            unityCanvas.removeEventListener("touchmove", (e) =>
              e.preventDefault()
            );
          }
          if (isLoaded && unload) await unload();
        } finally {
          removeEventListener("GameOver", handleGameOver);
          removeEventListener("SetScore", handleSetScore);
          removeEventListener("Quit", handleQuit);
        }
      };
      removeAllListeners();
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
  useEffect(
    function () {
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
    },
    [devicePixelRatio]
  );
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="game">
      {isLoaded === false && (
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Fragment>
        <Unity
          className="game__unity-player"
          style={{ visibility: isLoaded ? "visible" : "hidden" }}
          unityProvider={unityProvider}
          disabledCanvasEvents={["dragstart", "scroll"]}
          ref={canvasRef}
        />
        {userName && score && (
          <p>{`Set Score ${userName}! You've scored ${score} points.`}</p>
        )}
        <div>
          <button onClick={handleClickEnterFullscreen}>Enter Fullscreen</button>
        </div>
        {isGameOver === true && (
          <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
        )}
        <button onClick={handleClickBack}>Back</button>
      </Fragment>
    </div>
  );
}
