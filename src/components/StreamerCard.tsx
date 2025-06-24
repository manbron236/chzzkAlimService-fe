import React from 'react';
import type { LiveInfo } from '../types/Streamer';

interface Props {
  streamer: LiveInfo;
}

const StreamerCard: React.FC<Props> = ({ streamer }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', width: '320px', padding: '10px' }}>
      <img
        src={streamer.thumbnailUrl}
        alt={`${streamer.streamerName} 썸네일`}
        style={{ width: '100%', borderRadius: '4px' }}
        />
      <h3>{streamer.streamerName}</h3>
      <p>{streamer.liveTitle}</p>
      <p>{streamer.category}</p>
      <p>{streamer.tags.join(', ')}</p>
      <a href={streamer.liveUrl} target="_blank" rel="noopener noreferrer">
        방송 보러가기
      </a>
    </div>
  );
};

export default StreamerCard;
