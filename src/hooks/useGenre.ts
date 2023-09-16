import useGenres from "./useGenres";

const useGenre = (id?: number | null) => {
  const { data: genres } = useGenres();
  return genres?.results.find((g) => g.id === id);
};

export default useGenre;
