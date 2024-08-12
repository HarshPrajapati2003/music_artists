export const SkeletonLoaderForName = () => (
  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
    {Array.from({ length: 5 }).map((_, index) => (
      <li
        key={index}
        className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-200 animate-pulse"
      >
        <div className="h-4 bg-gray-200 rounded-md"></div>
      </li>
    ))}
  </ul>
);

export const SkeletonLoaderForCard = () => (
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
);
