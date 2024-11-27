import { useRef, useEffect, useState } from "react";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGamesList from "../../components/FeaturedGamesList/FeaturedGamesList";

function HomePage() {
  const [videoPath, setVideoPath] = useState("/trailers/RikoTheAdventurer.mp4");
  return (
    <main className="home-main">
      <Hero videoPath={videoPath} />
      <FeaturedGamesList setVideoPath={setVideoPath} />
    </main>
  );
}

export default HomePage;
