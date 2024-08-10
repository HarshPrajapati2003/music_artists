
import Search from "./components/search";


function App() {

  return (
    <div className="flex justify-center">
      <div className="container mt-3">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl mx-auto text-center py-3">
          Discover Your Favorite{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Music Artists
          </span>{" "}
          Worldwide.
        </h1>
        <Search />
      </div>
    </div>
  );
}

export default App
