import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ onTimestampChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleProgress = ({ playedSeconds }) => {
      onTimestampChange(playedSeconds);
  };



  return (
    <div className='h-[35vh] md:h-full w-[100%] md:w-[65%]'>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=DP_NqOOeoao&list=PL4Gr5tOAPttLOY9IrWVjJlv4CtkYI5cI_&index=19'
        controls
        width="100%"
        height="100%"
        onProgress={handleProgress}
        youtubeConfig={{
          playerVars: {
            modestbranding: 1, // Hides YouTube logo
            rel: 0, // Disables related videos
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;
