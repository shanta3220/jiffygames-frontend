import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";

import "./GamePage.scss";

export default function GamePage() {
  const { gameProjectName } = useParams();
  return (
    <main className="main-game">
      <section className="game-holder">
        <UnityPlayer gameProjectName={gameProjectName} />
      </section>
    </main>
  );
}
