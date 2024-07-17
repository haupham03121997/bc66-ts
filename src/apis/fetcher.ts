import axios from "axios";
import { BASE_URL, TOKEN_CYBER_SOFT } from "../constants/urlConfig";
import { CurrentUser } from "../interfaces/user.interface";
import { getLocalStorage } from "../utils";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    TokenCybersoft: TOKEN_CYBER_SOFT,
  },
});

fetcher.interceptors.request.use((config) => {
  const currentUser = getLocalStorage<CurrentUser>('user');

  config.headers = {
    ...config.headers,
    Authorization: currentUser ? `Bearer ${currentUser.accessToken}` : '', 
  } as any;

  return config
});

export default fetcher;