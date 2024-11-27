import { useRef, useEffect } from "react";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import FeaturedGamesList from "../../components/FeaturedGamesList/FeaturedGamesList";

function HomePage() {
  return (
    <main className="home-main">
      <Hero videoPath={"/trailers/RikoTheAdventurerTrailer.mp4"} />
      <FeaturedGamesList />
    </main>
  );
}

export default HomePage;
