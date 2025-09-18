import React, { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/outline';
import { FaceSmileIcon } from '@heroicons/react/24/solid';

const VideoPlayer = ({ isChatVisible, movieData }) => {
  const [canPlay, setCanPlay] = useState(false);
  const url = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
  const logoPath = `https://image.tmdb.org/t/p/original/e81YnyUwNs9YO8ljpPMMjrzHsgM.png`;
  return (
    <div
      className={`h-[85vh] flex rounded-xl items-center justify-center relative bg-black  transition-all duration-300 ${isChatVisible ? 'w-[70%]' : 'w-auto'} `}
    >
      <div className="relative bg-black rounded-xl w-full h-full mx-4 p-1  overflow-hidden">
        {canPlay ? (
          <video
            className="w-full h-full object-cover rounded-xl brightness-100"
            controls
            autoPlay={false}
            muted
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src="https://image.tmdb.org/t/p/original/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg"
            alt=""
            className="w-full h-full object-cover rounded-xl brightness-100 transition-all duration-300 "
          />
        )}
        {canPlay ? (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/20 pointer-events-none rounded-2xl" />
        ) : (
          <div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none rounded-2xl" />
          </div>
        )}
        {!canPlay && (
          <div
            className={`absolute bottom-6 left-6 text-white p-4 space-y-6 flex flex-col items-start ${isChatVisible ? 'w-fit' : 'w-auto'}`}
          >
            <img
              src={logoPath}
              alt="hello"
              className={`w-auto object-contain mb-4 ${isChatVisible ? 'max-h-24' : 'max-h-32'} transition-all duration-300`}
            />
            <p
              className={`text-lg leading-relaxed font-semibold line-clamp-3 transition duration-300 ${isChatVisible ? 'max-w-64' : 'max-w-lg'}`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              className={`bg-slate-400 hover:bg-slate-200 text-lg hover:text-black text-white font-bold rounded-xl  items-center gap-2 transition-all duration-300  ${isChatVisible ? 'py-2 px-4 text-md w-48' : 'py-3 px-8 w-64'}`}
              onClick={() => setCanPlay(true)}
            >
              <PlayIcon className="size-6 inline-block hover:text-black mr-2" />
              Watch Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
