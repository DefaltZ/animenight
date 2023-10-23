import logo from "../assets/imgs/logo.png";

import { Link } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";

export function Navbar() {
  const [searchState, setSearchState] = useState<boolean>(false) // Whether the search bar is hidden or not

  function toggleSearch(e: any) {
    e.preventDefault()

    setSearchState(!searchState)
  }

  return (
    <div>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              className="w-10 h-10 text-white p-2 bg-gray-500 rounded-full"
              src={logo}
            />
            <span className="ml-3 text-xl">AnimeNight</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-5 hover:text-white">Home</Link>
            <Link to="/bookmarks" className="mr-5 hover:text-white">Bookmarks</Link>
            <a href="https://discord.gg/aTv4jYGtCR" className="mr-5 hover:text-white">Discord</a>
            <a href="https://github.com/ArrancarDev/animenight" className="mr-5 hover:text-white">Github</a>
          </nav>
          <button className="inline-flex items-center bg-gray-800 border-0 py-3 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" onClick={toggleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </header>
      {
        searchState ? (
          <Search />
        ) : (
          <div></div>
        )
      }
    </div>
  );
}
