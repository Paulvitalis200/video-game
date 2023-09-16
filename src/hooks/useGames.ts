import { GameQuery } from "../App";
import { FetchResponse } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "./usePlatforms";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Game>("/games");
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) => {
  const fetchGames = () =>
    apiClient.getAll({
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    });

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: fetchGames,
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useGames;
