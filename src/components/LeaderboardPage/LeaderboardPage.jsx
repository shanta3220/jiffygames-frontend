import { useParams, Link } from "react-router-dom";
import "./LeaderboardPage.scss";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../scripts/GameApi";

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
  let i = 0;
  if (leaderboard == null) {
    return <p>loading...</p>;
  }
  return (
    <div className="leaderboard">
      <ul className="leaderboard-list">
        {leaderboard.map((entry) => {
          i++;
          console.log(entry.userInfo.id);
          return (
            <>
              <Link to={`/users/${entry.userInfo.id}`}>
                <li className="leaderboard-list__item" key={entry.userInfo.id}>
                  <div>
                    <p className="leaderboard-list__item-text">{i}</p>
                    <p className="leaderboard-list__item-text">
                      {entry.userInfo.user_name}
                    </p>
                    <p className="leaderboard-list__item-text">{entry.score}</p>
                  </div>
                </li>
              </Link>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default LeaderboardPage;
