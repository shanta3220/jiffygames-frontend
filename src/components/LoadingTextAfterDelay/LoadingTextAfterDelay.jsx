import { useEffect, useState, useRef } from "react";

function LoadingTextAfterDelay({ games }) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!games || games.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setShow(true);
      }, 500);
    } else {
      setShow(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [games]);

  return show && (!games || games.length === 0) ? (
    <p className="body-copy">
      Loading games... The server might be idle. Please wait a moment or refresh
      the page in 1 minute.
    </p>
  ) : null;
}

export default LoadingTextAfterDelay;
