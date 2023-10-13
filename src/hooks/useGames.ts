import { FetchResponse } from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";
import useGameQueryStore from "../store";
import Game from "../entities/Game";

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
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
    staleTime: ms("24h"), //24h
    getNextPageParam: (lastPage, allPages) => {
      //1 -> 2
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
