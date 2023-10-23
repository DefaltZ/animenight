import { IAnimeResult } from "@consumet/extensions"
import SearchResult from "./SearchResult"

type SearchResultsProps = {
    results: IAnimeResult[]
    setResults: (res: IAnimeResult[]) => void
}


export default function SearchResults(props: SearchResultsProps) {
    /*
     * Set the query back to an empty string
    */
    function clearResults() {
        props.setResults([])
    }

    return (
        <div className="bg-gray-900 flex flex-wrap transition ease-in-out">
            {
                props.results.map((result: IAnimeResult, index) => {
                    return (
                        <SearchResult result={result} index={index} clearResults={clearResults}/>
                    )
                })
            }
        </div>
    )
}