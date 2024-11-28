import { useRef, useEffect } from "react";
import background from "../../assets/images/hero-background.png";
import leaderboardImage from "../../assets/images/leaderboard.png";

function Hero({ videoPath }) {
  const backgroundRef = useRef(null);
  const leaderBoardRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const leaderBoardListRef = useRef(null);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }
  }, [videoPath]);

  useEffect(() => {
    const updateLeaderboardSize = () => {
      if (leaderBoardRef.current && leaderBoardListRef.current) {
        const { width, height } =
          leaderBoardRef.current.getBoundingClientRect();

        // Set width and height for leaderboard dynamically
        leaderBoardListRef.current.style.setProperty(
          "width",
          `${width * 0.87}px`
        );
        leaderBoardListRef.current.style.setProperty(
          "height",
          `${height * 0.77}px`
        );
      }
    };

    // Create a ResizeObserver to watch for changes to the leaderboard size
    const observer = new ResizeObserver(updateLeaderboardSize);
    if (leaderBoardRef.current) {
      observer.observe(leaderBoardRef.current); // Correct method usage
    }

    // Cleanup observer on component unmount
    return () => {
      if (leaderBoardRef.current) {
        observer.unobserve(leaderBoardRef.current); // Correct cleanup
      }
    };
  }, []);
  useEffect(() => {
    const updateBackgroundSize = () => {
      if (backgroundRef.current && videoPlayerRef.current) {
        const { width, height } = backgroundRef.current.getBoundingClientRect();

        // Set width and height for leaderboard dynamically
        videoPlayerRef.current.style.setProperty("width", `${width}px`);
        videoPlayerRef.current.style.setProperty(
          "height",
          `${height * 0.92}px`
        );
      }
    };

    // Create a ResizeObserver to watch for changes to the leaderboard size
    const observer = new ResizeObserver(updateBackgroundSize);
    if (backgroundRef.current) {
      observer.observe(backgroundRef.current); // Correct method usage
    }
    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current); // Correct cleanup
      }
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero__images">
        <img
          src={background}
          alt="Background"
          className="hero__background"
          ref={backgroundRef}
        />
        <img
          src={leaderboardImage}
          alt="Leaderboard"
          className="hero__leaderboard-container"
          ref={leaderBoardRef}
        />
      </div>
      <div className="hero__contents">
        <div className="hero__video-player" ref={videoPlayerRef}>
          <video
            className="hero__video"
            ref={videoRef}
            crossOrigin="anonymous"
            src={videoPath}
          />
        </div>
        <div className="hero__leaderboard-list" ref={leaderBoardListRef}></div>
      </div>
    </section>
  );
}

export default Hero;
