import { useEffect, useState, useRef } from "react";
import "./LoadingTextAfterDelay.scss";

function LoadingTextAfterDelay({ games, readyToShowApp, setReadyToShowApp }) {
  const [hasShownOnce, setHasShownOnce] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setHasShownOnce(true);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [games]);

  if (games && !hasShownOnce) {
    setReadyToShowApp(true);
    return null;
  }

  if (readyToShowApp || !hasShownOnce) {
    return null;
  }

  return (
    <section className="loading">
      {(!games || games.length === 0) && (
        <div>
          <p className="body-copy">
            Loading games... The server might be idle. Please wait a moment or
            refresh the page in 1 minute.
          </p>
          <p className="body-copy">
            By the way, while you wait, check out my favourite song!
          </p>
        </div>
      )}

      {games && games.length > 0 && (
        <>
          <p className="body-copy">
            Games loaded! Thanks for waiting. You can now check out the games.
          </p>
          <button
            type="button"
            className="button loading__button"
            onClick={() => setReadyToShowApp(true)}
          >
            Enter the Site
          </button>
        </>
      )}

      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/4fndeDfaWCg?si=1YxU9TZ3wfWLbs_m"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </section>
  );
}

export default LoadingTextAfterDelay;
