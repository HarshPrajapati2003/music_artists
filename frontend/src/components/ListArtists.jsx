const ListArtists = ({ allArtists }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8 mt-5">
      {allArtists.map((artist) => (
        <a
          key={artist.id}
          href="#"
          className="group relative block bg-black"
          id={artist.id}
        >
          <img
            alt={artist.artist_names}
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
  );
};

export default ListArtists