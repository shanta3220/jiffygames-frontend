import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getFullPath = (path) => {
  return `${baseUrl}/${path}`;
};

export const guestUserName = "Guest";

// Games
export async function getGameList() {
  try {
    const { data } = await axios.get(getFullPath("games"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function likeGame(gameId) {
  try {
    const { data } = await axios.get(getFullPath(`games/${gameId}/like`));
    return data.like_count;
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

// Leaderboards, User Scores
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

export async function getUserScore(gameId) {
  const userId = getMyUserId();
  try {
    const { data } = await axios.get(
      getFullPath(`leaderboards/?user_id=${userId}&game_id=${gameId}`)
    );

    return data.score || 0;
  } catch (error) {
    if (error.response?.status === 404) {
      return 0;
    }

    console.error("Error fetching score:", error);
    throw error;
  }
}

export async function postUserScore(gameId, score) {
  if (isGuestUser()) {
    return;
  }
  const userId = getMyUserId();
  try {
    const userObject = {
      user_id: userId,
      score: score,
    };
    const { data } = await axios.post(
      getFullPath(`leaderboards/${gameId}`),
      userObject
    );
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return 0;
    }

    console.error("Error posting score:", error);
    throw error;
  }
}

// Comments
export async function postComment(commentObject) {
  try {
    const { data } = await axios.post(getFullPath("comments"), commentObject);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(commentId) {
  try {
    await axios.delete(getFullPath(`comments/${commentId}`));
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function likeComment(commentId) {
  try {
    const { data } = await axios.get(getFullPath(`comments/${commentId}/like`));
    return data.like_count;
  } catch (error) {
    console.error(error);
  }
}

// Users
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

export async function postUser(userObject) {
  try {
    const { data } = await axios.post(getFullPath("users"), userObject);
    return data;
  } catch (error) {
    if (error.response?.status !== 400) {
      console.error(error);
    }
  }
}

export async function getUserGames(userId) {
  try {
    const { data } = await axios.get(getFullPath(`users/${userId}/games`));
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Axios auth wiring
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axios.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    return Promise.reject(err);
  }
);

// Users and Authentication
export async function login(username, password) {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      username,
      password,
    });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      return data.user;
    }
    return null;
  } catch (error) {
    if (error.response?.status === 401) return null;
    console.error("Error during login:", error);
    return null;
  }
}

export function getMyUserId() {
  return localStorage.getItem("userId") ?? guestUserName;
}

export function Logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
}

export function isGuestUser(username = getMyUserId()) {
  return username === guestUserName;
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
