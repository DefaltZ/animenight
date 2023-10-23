import { IAnimeResult } from "@consumet/extensions";
import React from "react";
import { Link } from "react-router-dom";

type SearchResultProps = {
    result: IAnimeResult;
    index: number;
    clearResults: (e: React.MouseEvent) => void;
};

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
            <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">{`${props.result.title}`}</h2>
            <Link to={`/stream/${props.result.id}/1`} onClick={props.clearResults} className="text-red-400 inline-flex items-center">Watch 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>

            </Link>
        </div>

    );
}
