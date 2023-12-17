import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://host.docker.internal:3001',
  headers: {
    "Content-type": "application/json"
  }
});