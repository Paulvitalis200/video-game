import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import genres from "../data/genres";
import APIClient from "../services/api-client";
import { Genre } from "../entities/Genre";

const apiClient = new APIClient<Genre>("/genres");
// const useGenres = () => ({ data: genres, isLoading: false, error: null });
const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24h
    initialData: genres,
  });
};
// This is done to  minimize the impact of this change on the consumers of this hook. (GenreList)
export default useGenres;
