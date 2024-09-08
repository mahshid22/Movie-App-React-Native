import React from "react";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import {
  fetchSearchResults,
  fetchSimilarShows,
  fetchSimilarMovies,
} from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";

const SearchScreen = () => {
  const { query } = useLocalSearchParams();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const [details, setDetails] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const searchMoveOrShows = async () => {
      try {
        const results = await fetchSearchResults(query);
        setSearchResult(results);
        if (results.length > 0) {
          const firstItem = results[0];
          const isMovie = !!firstItem.title;
          setItemType(isMovie ? "movie" : "tv");
          if (isMovie) {
            const similarMovie = await fetchSimilarMovies(firstItem.id);
            setSimilar(similarMovie);
          } else {
            const similarTv = await fetchSimilarShows(firstItem.id);
            setSimilar(similarTv);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchMoveOrShows();
  }, [query]);
};
export default SearchScreen;
