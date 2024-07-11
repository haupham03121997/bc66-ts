import axios from "axios";
import { BASE_URL, TOKEN_CYBER_SOFT } from "../constants/urlConfig";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    TokenCybersoft: TOKEN_CYBER_SOFT,
  },
});

fetcher.interceptors.request.use((config) => {
  return config
});

export default fetcher;