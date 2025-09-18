import { useState } from "react";
import MovieInfo from "../components/MovieInfo";
import VideoPlayer from "../components/VideoPlayer";

const MoviePage = () =>{
  const [isChatEnabled,setIsChatEnabled] = useState(false)

  const handleChatEnable = (enabled) =>{
    setIsChatEnabled(enabled);
  }
    return (
      <div className="min-h-screen bg-black space-y-2">
        <VideoPlayer isChatVisible={isChatEnabled} movieData={null}/>
        <div>
          <MovieInfo movieData={null} isWatchParty={true} onEnableChat={handleChatEnable} isChatEnable={isChatEnabled}/>
        </div>
      </div>
    );
}

export default MoviePage;