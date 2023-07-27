import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "fdebd5dac5c24868acc150d8ef56bf87",
  },
});
