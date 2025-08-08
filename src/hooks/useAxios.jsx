import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://homehunt-server-azure.vercel.app`,
  withCredentials: true,
});

function useAxios() {
  return axiosInstance;
}

export default useAxios;
