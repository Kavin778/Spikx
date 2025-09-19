const CastCard = ({ castData }) => {
  const tmdbImageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const castUrl = `${tmdbImageBaseUrl}${castData.profile_path}`;
  return (
    <div className="flex-shrink-0 relative w-48 h-64 bg-red-600 rounded-md overflow-hidden group items-center">
      <img
        src={castUrl}
        alt={castData.name}
        className="w-full h-full object-cover group-hover:brightness-75"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {castData.name}
        </p>
        <p className="text-white font-bold text-xs opacity-0  group-hover:opacity-100 transition-opacity duration-300">
          ({castData.character || castData.job})
        </p>
      </div>
    </div>
  );
};

export default CastCard;
