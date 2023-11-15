import { useNavigate } from "react-router-dom"; //useNaviate hook to navigate between pages, in this codebase specifically 404 pages
import { ANIME, IAnimeInfo, IEpisodeServer, IAnimeEpisode } from "@consumet/extensions"; //using consumet library function for anime listing
import preloaderGif from "../assets/imgs/preloader.gif"; //GIF to use for the loading page animation
import { useEffect, useState } from "react"; //standard statefulness import
import AnimeDetail from "./AnimeDetail"; 
import EpisodeSelector from "./EpisodeSelector";

type VideoProps = {
  episodeNum: string; 
  animeId: string;
}; //VideoProps is a TS object type with two string properties: episodeNum and animeID

export default function Video(props: VideoProps) {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true); //useState hook for loading page, set to (true)
  const [currentServer, setCurrentServer] = useState<IEpisodeServer>(); //useState hook for the streaming server to be fetched the episode from, as selected by the end user
  const [servers, setServers] = useState<IEpisodeServer[]>();  //usestate hook to set the choosen streaming server
  const [animeDetails, setAnimeDetails] = useState<IAnimeInfo>(); //usestate hook to fetch information on the anime
  const [episodes, setEpisodes] = useState<IAnimeEpisode[]>([]); //useState hook to fetch the episode number according to the anime choosen

  useEffect(() => {
    (async () => { //asynchronous function
      try { 
        const source = new ANIME.Gogoanime();
        const data = await source.fetchEpisodeServers(`${props.animeId}-episode-${props.episodeNum}`); //data variable fetches available servers based on the animeID and episodeNum prop

        if (data.length === 0) {
          navigate("/404"); // Redirect to 404 page if the episode is not found
          return;
        }

        setServers(data); //setServers useState hook is updated to fetch data from the data array

        const server = data[0]; //server variable acesses index 0(the first streaming website) from data variable as it is an array
        setCurrentServer(server); 
        setLoading(false);

        const anime: IAnimeInfo = await source.fetchAnimeInfo(props.animeId); //fetchAnimeInfo asynchronous function fetches info about the anime using the animeID prop
        setAnimeDetails(anime); //update the state with the fetched anime details into the anime variable 
        setEpisodes(anime.episodes!);
      } catch (error) {
        navigate("/404"); // Redirect to 404 page if the anime is not found
      }
    })();
  }, [props.animeId, props.episodeNum, history]);

  //handle user selection of a streaming server:
  const handleServerSelection = (server: IEpisodeServer) => {
    setCurrentServer(server); //server choosen by the user is used to update the state of the server variable
  };

  return loading ? (
    <div className="flex items-center justify-center bg-gray-900 h-screen">
      <img src={preloaderGif} alt="loading" />
    </div>
  ) : (
    <div>
      <div className="flex flex-wrap items-center justify-center pt-0 space-x-2">
        <div className="text-2xl text-red-400 bg-gray-900 w-full text-center font-bold p-4">
          You are watching: {`${animeDetails?.title || "loading..."}, episode ${props.episodeNum}`}
        </div>
        {currentServer && (
          <div className="w-full max-w-screen-lg border-4 border-gray-800 rounded-lg overflow-hidden mt-0 py-1">
            <iframe src={currentServer.url} className="h-screen w-full p-0" allowFullScreen></iframe>

            {episodes.length > 0 && <EpisodeSelector episodes={episodes} currentEpisode={parseInt(props.episodeNum)} animeId={props.animeId}/>}

            <div className="flex flex-wrap p-5 justify-center bg-black text-white body-font space-x-5">
              <div className="flex flex-wrap p-3 space-x-1 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
                </svg>

                <p className="text-lg font-bold">Available servers</p>
              </div>
              {servers?.map((server: IEpisodeServer) => (
                <button
                  key={server.name}
                  onClick={() => handleServerSelection(server)}
                  className={`${
                    currentServer === server ? 'bg-red-600 font-bold' : 'bg-gray-800'
                  } p-2 rounded-lg transition duration-300 transform hover:scale-110 hover:-translate-y-1`}
                >
                  {server.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {animeDetails && <AnimeDetail details={animeDetails} />}
    </div>
  );
}
