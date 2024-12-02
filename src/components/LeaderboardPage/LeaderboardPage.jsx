import { useParams, Link } from "react-router-dom";
import "./LeaderboardPage.scss";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../scripts/GameApi";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { useNavigate } from "react-router-dom";

function LeaderboardPage() {
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState(null);
  const { leaderboardId } = useParams();
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboard = await getLeaderboard(leaderboardId);
        console.log(leaderboard);
        setLeaderboard(leaderboard);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaderboard();
  }, [leaderboardId]);

  if (!leaderboard) {
    return <p>loading...</p>;
  }

  return (
    <main className="main-leaderboard">
      <h1>{leaderboard.game_name}</h1>
      <ul className="leaderboard-list">
        <div className="leaderboard-list__item">
          <p className="leaderboard-list__item-label--rank">RANK</p>
          <p className="leaderboard-list__item-label--avatar">AVATAR</p>
          <p className="leaderboard-list__item-label--user">USER</p>
          <p className="leaderboard-list__item-label--score">SCORE</p>
        </div>

        {leaderboard.scores.map((entry, i) => (
          <div
            onClick={() => {
              navigate(`/users/${entry.user_id}`);
            }}
            key={entry.user_id}
          >
            <li className="leaderboard-list__item leaderboard-list__item--hover">
              <p className="leaderboard-list__item-text">{i + 1}</p>
              <UserAvatar
                userId={entry.user_id}
                linkPath={`/users/${entry.user_id}`}
              />
              <p className="leaderboard-list__item-text">{entry.username}</p>
              <p className="leaderboard-list__item-text">{entry.score}</p>
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default LeaderboardPage;
