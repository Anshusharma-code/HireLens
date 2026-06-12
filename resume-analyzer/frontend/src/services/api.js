import axios from "axios";

const API = axios.create({
  baseURL: "https://hirelens-g2om.onrender.com"
});

export default API;