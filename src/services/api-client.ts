import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

//Create default axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "fdebd5dac5c24868acc150d8ef56bf87",
  },
});

// Used to send diff http requests to a particular endpoint
class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // We add a generic type T to avoid a promise of any
  // We use arrow functions so that the this instance will refer to the API client instance
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  post = (data: T) => {
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
