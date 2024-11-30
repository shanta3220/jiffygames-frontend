import { useParams, Link } from "react-router-dom";
import "./LeaderboardPage.scss";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../scripts/GameApi";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(null);
  const { leaderboardId } = useParams();
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboard = await getLeaderboard(leaderboardId);
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
      <h1>{leaderboard.gameInfo.game_name}</h1>
      <ul className="leaderboard-list">
        <div className="leaderboard-list__item">
          <p className="leaderboard-list__item-label--rank">RANK</p>
          <p className="leaderboard-list__item-label--avatar">AVATAR</p>
          <p className="leaderboard-list__item-label--user">USER</p>
          <p className="leaderboard-list__item-label--score">SCORE</p>
        </div>

        {leaderboard.userEntries.map((entry, i) => (
          <Link to={`/users/${entry.userInfo.id}`} key={entry.userInfo.id}>
            <li className="leaderboard-list__item leaderboard-list__item--hover">
              <p className="leaderboard-list__item-text">{i + 1}</p>
              <UserAvatar
                avatar={entry.userInfo.avatar}
                linkPath={`/users/${entry.userInfo.id}`}
              />
              <p className="leaderboard-list__item-text">
                {entry.userInfo.user_name}
              </p>
              <p className="leaderboard-list__item-text">{entry.score}</p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export default LeaderboardPage;
