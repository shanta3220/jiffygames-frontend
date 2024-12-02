import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

const getFullPath = (path) => {
  return `${baseUrl}/${path}`;
};

export async function getGameList() {
  try {
    const { data } = await axios.get(getFullPath("games"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGameInfo(gameId) {
  try {
    const { data } = await axios.get(getFullPath(`games/${gameId}`));

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getLeaderboards() {
  try {
    const { data } = await axios.get(getFullPath("leaderboards"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getLeaderboard(gameId) {
  try {
    const { data } = await axios.get(getFullPath(`leaderboards/${gameId}`));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers() {
  try {
    const { data } = await axios.get(getFullPath("users"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(userId) {
  try {
    const { data } = await axios.get(getFullPath(`users/${userId}`));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(userId, userObject) {
  try {
    const { data } = await axios.put(
      getFullPath(`users/${userId}`),
      userObject,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function PostComment(commentObject) {
  try {
    const { data } = await axios.post(getFullPath("comments"), commentObject);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteComment(commentId) {
  try {
    await axios.delete(getFullPath(`comments/${commentId}`));
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function Login(username, password) {
  try {
    const users = await getUsers();
    if (users && users.length > 0) {
      let user = users.filter((user) => {
        return (
          user.username.trim().toLowerCase() === username.trim().toLowerCase()
        );
      });
      if (user) {
        user = await getUser(user[0].id);
        const match =
          user.username.trim().toLowerCase() ===
            username.trim().toLowerCase() && user.password === password;
        if (match) {
          localStorage.setItem("userId", user.id);
          return user;
        } else {
          localStorage.removeItem("userId");
          return null;
        }
      }
    } else {
      console.warn("No users found");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }

  return null;
}

export function getMyUserId() {
  return localStorage.getItem("userId");
}

export function Logout() {
  localStorage.removeItem("userId");
}

export async function FindGamesByUser(userId) {
  try {
    const user = await getUser(userId);
    if (user) {
      const leaderboards = await getLeaderboards();
      console.log(leaderboards);

      let leaderboardArray = [];
      if (Array.isArray(leaderboards)) {
        leaderboardArray = leaderboards;
      } else if (typeof leaderboards === "object") {
        leaderboardArray = Object.values(leaderboards);
      }

      // Find the leaderboard where the user has a score
      const [game_id, score] = leaderboardArray.find((leaderboard) =>
        leaderboard.scores.some((score) => score.user_id == userId)
      );

      console.log(game_id, score);
      if (leaderboardWithUserScore) {
        // Assuming each leaderboard has a single score entry for the user
        const userScore = leaderboardWithUserScore.scores.find(
          (score) => score.user_id == userId
        );
        const gameId = leaderboardWithUserScore.game_id;
        const score = userScore ? userScore.score : null;

        console.log({ userId, gameId, score });
        return { userId, gameId, score }; // Return the gameId and score
      } else {
        console.warn("No scores found for the user in any leaderboard.");
        return null;
      }
    } else {
      console.warn("No user found with the provided ID");
      return null;
    }
  } catch (error) {
    console.error("Error finding games by user:", error);
    return null;
  }
}

FindGamesByUser(2);
