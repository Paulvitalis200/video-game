// import { useQuery } from "@chakra-ui/react";
import axios from "axios";
import genres from "../data/genres";
import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Genre>("/genres");
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// const useGenres = () => ({ data: genres, isLoading: false, error: null });
const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: genres,
  });
};
// This is done to  minimize the impact of this change on the consumers of this hook. (GenreList)
export default useGenres;
