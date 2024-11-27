import UnityPlayer from "../../components/UnityPlayer/UnityPlayer";
import { useParams } from "react-router-dom";

import "./GamePage.scss";

export default function GamePage() {
  const { gameProjectName } = useParams();
  return <UnityPlayer gameProjectName={gameProjectName} />;
}
