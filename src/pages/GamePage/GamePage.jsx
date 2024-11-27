import "./App.scss";
import UnityPlayer from "./Component/UnityPlayer";

export default function GamePage({ gameProjectName }) {
  return <UnityPlayer gameProjectName={gameProjectName} />;
}
