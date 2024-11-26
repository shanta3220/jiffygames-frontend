import { useRef, useEffect } from "react";
import "./HomePage.scss";
import background from "../../assets/images/hero-background.png";

function HomePage() {
  const backgroundRef = useRef(null);
  const leaderBoardRef = useRef(null);

  useEffect(() => {
    const updateLeaderboardSize = () => {
      if (backgroundRef.current && leaderBoardRef.current) {
        console.log(backgroundRef.current.getBoundingClientRect());
        const { width, height } = backgroundRef.current.getBoundingClientRect();
        leaderBoardRef.current.style.setProperty("width", `${width * 0.2}px`);
        leaderBoardRef.current.style.setProperty(
          "height",
          `${height * 0.75}px`
        );
      }
    };

    const updateLeaderboardPosition = () => {
      if (backgroundRef.current && leaderBoardRef.current) {
        const { width, height } = backgroundRef.current.getBoundingClientRect();
        leaderBoardRef.current.style.setProperty("width", `${width * 0.2}px`);
        leaderBoardRef.current.style.setProperty(
          "height",
          `${height * 0.75}px`
        );
      }
    };

    const observer = new ResizeObserver(() => {
      updateLeaderboardSize();
      updateLeaderboardPosition();
    });

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);
  return (
    <main className="hero">
      <img
        src={background}
        alt=""
        className="hero__background"
        ref={backgroundRef}
      />
      <div className="hero__leaderboard-container" ref={leaderBoardRef}></div>
    </main>
  );
}

export default HomePage;
