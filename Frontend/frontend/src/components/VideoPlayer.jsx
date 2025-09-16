import React from 'react';

const VideoPlayer = () => {
  const url = `http://localhost:3000/api/movies/getMovie/cmfjr5ibo0000i0xiey4v62f0`;
  return (
    <div className="w-auto h-[90vh] flex items-center justify-center relative bg-black">
      <video className="w-full h-full object-cover" controls autoPlay muted>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

