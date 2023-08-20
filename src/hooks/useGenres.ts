import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => ({ data: genres, isLoading: false, error: null });
// This is done to  minimize the impact of this change on the consumers of this hook. (GenreList)
export default useGenres;
