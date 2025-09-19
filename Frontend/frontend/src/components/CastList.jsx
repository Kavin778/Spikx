import CastCard from './CastCard';

const CastList = ({ cast, title }) => {
  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="overflow-x-auto overflow-y-auto no-scrollbar">
        <div className="flex space-x-6 w-max">
          {cast
            .filter(castmember => castmember.profile_path)
            .map(castMember => (
              <CastCard key={castMember.id} castData={castMember} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CastList;
