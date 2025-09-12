import React from 'react';

const Moviecard = movieData => {
  return (
    <div className=" w-58 h-82 bg-white rounded-lg overflow-hidden shadow-xl relative items-center group m-24 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:z-10">
      <img
        src="src/assets/poster.jpeg"
        alt="title"
        className="w-full h-full object-cover group-hover:brightness-75"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors duration-200">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default Moviecard;
