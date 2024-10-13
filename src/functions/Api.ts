import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const getPopularAnimes = async () => {
  const response = await axios.get(`${BASE_URL}/top/anime`);
  return response.data;
};

export const getTopAnimes = async () => {
  const response = await axios.get(`${BASE_URL}/top/anime?filter=bypopularity`);
  return response.data;
};

export const getUpcomingAnimes = async () => {
  const response = await axios.get(`${BASE_URL}/seasons/upcoming`);
  return response.data;
};

export const getAiringAnimes = async () => {
  const response = await axios.get(`${BASE_URL}/anime`, {
    params: {
      status: "airing",
      order_by: "popularity",
      sort: "asc",
    },
  });
  return response.data;
};

export const getAnimeGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genres/anime`, {
    params: {},
  });
  return response.data;
};
