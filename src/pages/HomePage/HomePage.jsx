import { useRef, useEffect } from "react";
import "./HomePage.scss";
import background from "../../assets/images/hero-background3.png";

function HomePage() {
  const backgroundRef = useRef(null);
  const leaderBoardRef = useRef(null);

  // useEffect(() => {
  //   const updateLeaderboardSize = () => {
  //     if (backgroundRef.current && leaderBoardRef.current) {
  //       const { width, height } = backgroundRef.current.getBoundingClientRect();

  //       // Set width and height for leaderboard dynamically
  //       leaderBoardRef.current.style.setProperty("width", `${width * 0.2}px`);
  //       leaderBoardRef.current.style.setProperty("height", `${height * 0.8}px`);

  //       // Position the leaderboard relative to the background
  //       const topOffset = height * 0.1; // 10% from the top
  //       const rightOffset = 5; // Align to the right of the background

  //       // Update position based on the background size
  //       leaderBoardRef.current.style.setProperty("top", `${topOffset}px`);
  //       leaderBoardRef.current.style.setProperty("right", `${rightOffset}%`); // Keep aligned to the right side of the background
  //     }
  //   };

  //   // Create a ResizeObserver to watch for changes to the background size
  //   const observer = new ResizeObserver(updateLeaderboardSize);
  //   if (backgroundRef.current) {
  //     observer.observe(backgroundRef.current);
  //   }

  //   // Cleanup observer on component unmount
  //   return () => {
  //     if (backgroundRef.current) {
  //       observer.unobserve(backgroundRef.current);
  //     }
  //   };
  // }, []);

  return (
    <main className="hero">
      <div className="hero__background" />
      <div className="hero__leaderboard-container"></div>
    </main>
  );
}

export default HomePage;
