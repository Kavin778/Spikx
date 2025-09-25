import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/outline';
import { getSignedUrl } from '../api/MoviesService';
import socketService from '../api/SocketService';

const VideoPlayer = ({ isChatVisible, movieData, roomId, isHost }) => {
  const [canPlay, setCanPlay] = useState(false);
  const [movieUrl, setMovieUrl] = useState(null);
  const logoBaseUrl = import.meta.env.VITE_TMDB_ORIGINAL_IMAGE_BASE_URL;
  const logoPath = `${logoBaseUrl}${movieData.logos[0].file_path}`;
  const backdropUrl = `${logoBaseUrl}${movieData.backdrops[0].file_path}`;

  const handleWatchNow = async () => {
    try {
      const signedUrl = await getSignedUrl(movieData.id);
      setMovieUrl(signedUrl);
      setCanPlay(true);
    } catch (error) {
      console.error('Error Loading file');
    }
  };

  const videoRef = useRef(null);
  const isReceivingSync = useRef(false);

  const syncVideoPlayer = syncData => {
    const videoElement = videoRef.current;

    if (!videoElement || !syncData) {
      return;
    }

    if (Math.abs(videoElement.currentTime - syncData.time) > 1.5) {
      videoElement.currentTime = syncData.time;
    }

    if (syncData.state === 'playing' && videoElement.paused) {
      videoElement.play().catch(e => console.error('Play prevented', e));
    } else if (syncData.state === 'paused' && !videoElement.paused) {
      videoElement.pause();
    }

    setTimeout(() => {
      isReceivingSync.current = false;
    });
  };

  const handlePlay = () => {
    if (isReceivingSync.current) return;
    socketService.hostPlay(roomId, videoRef.current.currentTime);
  };

  const handlePause = () => {
    if (isReceivingSync.current) return;
    socketService.hostPause(roomId, videoRef.current.currentTime);
  };

  const handleSeek = () => {
    if (isReceivingSync.current) return;
    socketService.handleSeek(roomId.videoRef.current.currentTime);
  };

  useEffect(() => {
    socketService.onSyncPlayback(syncVideoPlayer);

    const videoElement = videoRef.current;

    if (videoElement && canPlay && isHost) {
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('seeking', handleSeek);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('seeking', handleSeek);
      };
    }
  }, [roomId, isHost, canPlay]);

  return (
    <div className="relative bg-black rounded-xl w-full h-full mx-4 p-1  overflow-hidden">
      {canPlay ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl brightness-100"
          controls={isHost}
          autoPlay={false}
          muted
        >
          <source src={movieUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={backdropUrl}
          alt={movieData.title}
          className="w-full h-full object-cover rounded-xl brightness-100 transition-all duration-300 "
        />
      )}
      {canPlay ? (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/20 pointer-events-none rounded-2xl" />
      ) : (
        <div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none rounded-2xl" />
        </div>
      )}
      {!canPlay && (
        <div
          className={`absolute bottom-6 left-6 text-white p-4 space-y-6 flex flex-col items-start transition duration-300 ${isChatVisible ? 'w-md' : 'w-xl'}`}
        >
          <img
            src={logoPath}
            alt={movieData.title}
            className={`w-fit object-contain mb-4 ${isChatVisible ? 'max-h-24' : 'max-h-32'} transition-all duration-300`}
          />
          <p
            className={`text-md leading-relaxed font-semibold transition duration-300 ${isChatVisible ? 'w-md' : 'max-w-lg text-lg'}`}
          >
            {movieData.tagline}
          </p>
          <button
            className={`bg-slate-400 hover:bg-slate-200 text-lg hover:text-black text-white font-bold rounded-xl  items-center gap-2 transition-all duration-300  ${isChatVisible ? 'py-2 px-4 text-md w-48' : 'py-3 px-8 w-64'}`}
            onClick={handleWatchNow}
          >
            <PlayIcon className="size-6 inline-block hover:text-black mr-2" />
            Watch Now
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
