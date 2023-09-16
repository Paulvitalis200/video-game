import { GameQuery } from "../App";
import { FetchResponse } from "../services/api-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  const fetchGames = ({ pageParam = 1 }) =>
    apiClient.getAll({
      params: {
        genres: gameQuery.genreId,
        parent_platforms: gameQuery.platformId,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
        page: pageParam,
      },
    });

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: fetchGames,
    staleTime: 24 * 60 * 60 * 1000, //24h
    getNextPageParam: (lastPage, allPages) => {
      //1 -> 2
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
