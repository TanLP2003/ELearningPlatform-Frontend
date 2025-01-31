import React, { useRef } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import './VideoPlayer.scss'

interface VideoPlayerProps {
  url: string | null
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const btnRef = useRef(null)
  const streamingServer = import.meta.env.VITE_STREAMING_SERVER
  return (
    <div className='video-container'>
      <div className='video-wrapper'>
        <ReactHlsPlayer
          src={url ? `${streamingServer}/${url}` : '#'}
          autoPlay={false}
          width='100%'
          height='auto'
          controls
          playerRef={btnRef}
          className='video-player'
        />
      </div>
    </div>
  )
}
export default VideoPlayer
