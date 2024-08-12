import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ pageData, handlePage, page, ITEMS_PER_PAGE }) => {
  return (
    <>
      {pageData.totalPages > 1 && (
        <div className="flex flex-1 justify-between sm:hidden py-3">
          <div
            onClick={() => handlePage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
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
      )}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between py-7">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pageData.page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pageData.page * ITEMS_PER_PAGE, pageData.totalArtists)}
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
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({
              length: pageData.totalPages > 10 ? 10 : pageData.totalPages,
            }).map((_, i) => (
              <div
                key={i + 1}
                onClick={() => handlePage(i + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center border ${
                  i + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                } px-4 py-2 text-sm font-medium cursor-pointer`}
              >
                {i + 1}
              </div>
            ))}

            {pageData.totalPages > 10 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}

            <div
              onClick={() =>
                handlePage(page < pageData.totalPages ? page + 1 : page)
              }
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination