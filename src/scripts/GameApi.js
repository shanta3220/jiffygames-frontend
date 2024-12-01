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
export async function getUsers() {
  try {
    const { data } = await axios.get(getFullPath("users"));
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

export async function getUser(userId) {
  try {
    const { data } = await axios.get(getFullPath(`users/${userId}`));
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(userObject) {}
