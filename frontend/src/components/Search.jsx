import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ITEMS_PER_PAGE=50

const Search = () => {
    const [allArtists, setAllArtists] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page,setPage]=useState(1)
    const handlePage = (page) => {
       setPage(page);
       window.scrollTo({ top: 0, left: 0 });
    };
    
    const fetchAllArtists = async (page) => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/all-artists/?page=${page}`);
        if (res.status == 200) {
          const { page, totalPages, totalArtists } = res.data;
          setAllArtists(res.data.artists);
          setPageData({ page, totalPages, totalArtists });
          console.log(allArtists);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  useEffect(() => {
      fetchAllArtists(page);
  },[page])
  return (
    <>
      {/* Search input */}
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required=""
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* skeleton loader component  */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 mt-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="group relative block bg-gray-300 animate-pulse"
            >
              <div className="absolute inset-0 h-full w-full bg-gray-400"></div>
              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="w-1/2 h-6 bg-gray-500 mb-4"></div>
                <div className="w-1/4 h-4 bg-gray-500 mb-2"></div>
                <div className="w-1/4 h-4 bg-gray-500 mb-4"></div>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="w-full h-16 bg-gray-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List of artists */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 mt-5">
        {allArtists.map((artist) => (
          <a
            key={artist._id}
            href="#"
            className="group relative block bg-black"
            id={artist._id}
          >
            <img
              alt=""
              src={artist.artist_img}
              className="absolute inset-0 h-full w-full lg:object-cover object-contain opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-xl font-bold text-white sm:text-2xl">
                {artist.artist_names}
              </p>
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                Genre : {artist.artist_genre}
              </p>
              <p className="text-sm font-medium uppercase tracking-widest text-green-500">
                Country : {artist.country}
              </p>

              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Omnis perferendis hic asperiores quibusdam quidem voluptates
                    doloremque reiciendis nostrum harum. Repudiandae?
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination component */}
      {pageData && (
        <>
          <div className="flex flex-1 justify-between sm:hidden py-3">
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer "
            >
              Previous
            </div>
            <div
              onClick={() =>
                handlePage(page < pageData.totalPages ? page + 1 : page)
              }
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between py-7">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(pageData.page - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {pageData.page * ITEMS_PER_PAGE > pageData.totalArtists
                    ? pageData.totalArtists
                    : pageData.page * ITEMS_PER_PAGE}
                </span>{" "}
                of <span className="font-medium">{pageData.totalArtists}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div
                  onClick={() => handlePage(page > 1 ? page - 1 : page)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                {Array.from({
                  length:
                    pageData.totalArtists > 10 ? 10 : pageData.totalArtists,
                }).map((ele, index) => (
                  <div
                    key={index}
                    onClick={() => handlePage(index + 1)}
                    aria-current="page"
                    className={`relative z-10 cursor-pointer inline-flex items-center ${
                      index + 1 === pageData.page
                        ? "bg-indigo-600 text-white"
                        : " text-gray-400"
                    } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                ))}
                {pageData.totalArtists > 10 && (
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                )}
                <div
                  onClick={() =>
                    handlePage(page < pageData.totalPages ? page + 1 : page)
                  }
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;