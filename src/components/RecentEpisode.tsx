import { IAnimeResult } from "@consumet/extensions"; //using consumet library function for anime listing
import { Link } from "react-router-dom";

type RecentEpisodeProps = {
  episode: IAnimeResult; //episode property scope is defined by IAnimeResult function
  index: number; //index is expected to be a number
}; //RecentEpisodeProp is a TS object type with two properties: episode and index

export default function RecentEpisode(props: RecentEpisodeProps) {  
  return (
    <div key={props.index} className="lg:w-1/3 sm:w-1/2 p-4 text-white relative">
      <Link to={`/stream/${props.episode.id}/1`}> {/*navigate to the details page of the anime listing*/}
        <div className="relative group overflow-hidden rounded-lg">  {/*overlay style for the anime listing*/}
          <img
            alt="gallery"
            className="w-full h-64 object-cover object-center transform group-hover:scale-110 transition duration-500 ease-in-out"
            src={props.episode.image as string} 
          /> {/*image for the overlay component*/} 
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="bg-black w-full h-16 absolute bottom-0 opacity-80 flex items-center justify-center">
              <h2 className="text-center text-sm text-white">
                {props.episode.title as string} {/*title of the anime for the overlay component*/}
              </h2>
            </div>
          </div>
        </div> {/*container with the image and title of the anime*/}
      </Link>
    </div>
  );
}
