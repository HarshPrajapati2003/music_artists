import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Typesense from "typesense";
import { SkeletonLoaderForCard } from "./SkeletonLoader";
import InputComp from "./InputComp";
import Pagination from "./Pagination";
import ListArtists from "./ListArtists";

const ITEMS_PER_PAGE = 50;

const Search = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [exactName, setExactName] = useState("");

  // Initialize Typesense client
  const client = new Typesense.Client({
    nodes: [
      {
        host: import.meta.env.VITE_TYPESENSE_NODES,
        port: "443", // Ensure the port is a number
        protocol: "https", // Use https since it's provided by Typesense Cloud
      },
    ],
    apiKey: import.meta.env.VITE_TYPESENSE_API_KEY, // Use the Search Only API Key
    connectionTimeoutSeconds: 2,
  });

  const handlePage = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, left: 0 });
  };

  const calculateTotalPages = (totalArtists, itemsPerPage) => {
    return Math.ceil(totalArtists / itemsPerPage);
  };

  const fetchAllArtists = async (page) => {
    setLoading(true);
    try {
      const searchParameters = {
        q: "*",
        query_by: "artist_names",
        per_page: ITEMS_PER_PAGE,
        page: page,
      };
      const res = await client
        .collections("artists")
        .documents()
        .search(searchParameters);

      // Manually calculate totalPages if not available
      const totalPages =
        res.total_pages || calculateTotalPages(res.found, ITEMS_PER_PAGE);

      const artists = res.hits.map((hit) => hit.document);
      setAllArtists(artists);
      setPageData({
        page: res.page,
        totalPages: totalPages,
        totalArtists: res.found,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function for searching
  const handleSearch = async (suggestion) => {
    setLoading(true);
    setSuggestions([]); // Hide the suggestions list
    setExactName(suggestion);
    try {
      const searchParameters = {
        q: suggestion,
        query_by: "artist_names",
        per_page: 50,
      };
      const res = await client
        .collections("artists")
        .documents()
        .search(searchParameters);
      const artists = res.hits.map((hit) => hit.document);
      setAllArtists(artists);
      setPageData({
        page: res.page,
        totalPages: Math.ceil(res.found / ITEMS_PER_PAGE) ,
        totalArtists: res.found,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Debounced function to fetch suggestions
  const fetchSuggestions = useCallback(
    _.debounce(async (input) => {
      if (input.length > 0) {
        setNameLoading(true);
        try {
          const searchParameters = {
            q: input,
            query_by: "artist_names,name_abbreviation", // Search by both artist names and abbreviations
            per_page: 5, // Limit the number of suggestions
          };
          const res = await client
            .collections("artists")
            .documents()
            .search(searchParameters);
          const suggestions = res.hits.map((hit) => hit.document.artist_names);
          setSuggestions(suggestions);
          setNameLoading(false);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setNameLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 400), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    fetchAllArtists(page);
    // console.log("pageData : ", pageData);
  }, [page]);

  return (
    <>
      {/* Search input */}
      <InputComp
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        exactName={exactName}
        setExactName={setExactName}
        suggestions={suggestions}
        nameLoading={nameLoading}
      />

      {/* Skeleton loader component for card */}
      {loading && <SkeletonLoaderForCard />}

      {/* List of artists */}
      <ListArtists allArtists={allArtists} />

      {/* Pagination component */}
      {pageData && (
        <Pagination
          pageData={pageData}
          handlePage={handlePage}
          page={page}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        />
      )}
    </>
  );
};

export default Search;
