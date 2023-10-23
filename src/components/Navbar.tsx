import { ANIME, IAnimeResult, ISearch } from "@consumet/extensions";
import { useState } from "react";
import logo from "../assets/imgs/logo.png";

import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";

export function Navbar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IAnimeResult[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  async function updateQuery(e: any) {
    setQuery(e.target.value);

    if (query === "") {
      setResults([])
    }
    await updateResults();
  }

  async function updateResults() {
    const source = new ANIME.Gogoanime();

    await source.search(query).then((data: ISearch<IAnimeResult>) => {
      setResults(data.results);
    });
  }

  const toggleMenu = () => {
    if (menuOpen) {
      setResults([])
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 m-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="AnimeNight" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AnimeNight
            </span>
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
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
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
              <span className="sr-only">Open Menu</span>
            </button>
            <div
              className={`relative ${menuOpen ? "block" : "hidden"} md:block`}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>

                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 focus:px-10 focus:transition-all"
                placeholder="Search..."
                onChange={updateQuery}
                value={query}
              ></input>
            </div>
          </div>
          <div
            className={`items-center justify-between ${menuOpen ? "block" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden"></div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmarks"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Bookmarks
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/4ExWBZREET"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SearchResults results={results} setResults={setResults} />
    </div>
  );
}
