const CastCard = ({ castData }) => {
  const castUrl = 'https://image.tmdb.org/t/p/w500/lCySuYjhXix3FzQdS4oceDDrXKI.jpg';
  return (
    <div className="flex-shrink-0 relative w-48 h-64 bg-red-600 rounded-md overflow-hidden group items-center">
      <img
        src={castUrl}
        alt="mathey"
        className="w-full h-full object-cover group-hover:brightness-75"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Matthew McConaughey
        </span>
        <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          as  Cooper
        </span>
      </div>
    </div>
  );
};

export default CastCard;
