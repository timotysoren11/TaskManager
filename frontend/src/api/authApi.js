import axios from "axios";


console.log("API URL:", import.meta.env.VITE_API_URL);

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export default authApi;