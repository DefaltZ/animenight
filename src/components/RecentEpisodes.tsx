import { ANIME, IAnimeResult, ISearch } from "@consumet/extensions"; //using consumet library functions for anime listings
import { useEffect, useState } from "react"; //standard statefulness import
import RecentEpisode from "./RecentEpisode";
import preloader from "../assets/imgs/preloader.gif"; //GIF to use for the loading page animation

export default function RecentEpisodes() {
  const [results, setResults] = useState<IAnimeResult[]>([]); //useState hook for fetching results
  const [loading, setLoading] = useState(true); //useState hook for loading page component

  useEffect(() => {
    (async () => {
      const source = new ANIME.Gogoanime();
      await source.fetchRecentEpisodes(1).then((res: ISearch<IAnimeResult>) => {
        setResults(res.results);
        setLoading(false);
      });
    })();
  }, []); //useEffect hook to fetch anime listing data from Gogoanime api, imported using consumet function
  //!critical implementation: requires Error handling method in the useEffect method to handle API errors.

  if (loading) {
    return <img src={preloader} alt="Loading" className="h-full m-auto"/>;
  } //preloader.gif to be used while page is still rendering

  return (
    <div>
      <div className="flex flex-wrap -m-4 p-4">
        {results.map((result: IAnimeResult, index) => (
          <RecentEpisode episode={result} index={index} key={index} />
        ))}
      </div>
    </div>
  );
} //this is the Episode listing component
//todo: requires key for list items iteration


