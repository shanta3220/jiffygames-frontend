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
      userObject
    );

    return data;
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
