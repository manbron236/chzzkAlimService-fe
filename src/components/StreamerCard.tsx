import React from 'react';
import type { LiveInfo } from '../types/Streamer';
// import './StreamerCard.css';

interface Props {
  streamer: LiveInfo;
}

const StreamerCard: React.FC<Props> = ({ streamer }) => {
  return (
    <a className="streamer-card" href={streamer.liveUrl} target="_blank" rel="noopener noreferrer">
      <img src={streamer.thumbnailUrl} alt={streamer.streamerName} className="streamer-thumbnail" />
      <div className="streamer-info">
        <h3>{streamer.streamerName}</h3>
        <p>방송 중 🔴</p>
      </div>
    </a>
  );
};

export default StreamerCard;
