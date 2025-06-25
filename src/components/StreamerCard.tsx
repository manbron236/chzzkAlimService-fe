import React from 'react';
import type { LiveInfo } from '../types/Streamer.ts';
import '../styles/streamerCard.css';

interface Props {
  streamer: LiveInfo;
}

const StreamerCard: React.FC<Props> = ({ streamer }) => {
  return (
    <div className="streamer-card">
      <div className="thumbnail-wrapper">
        <img
          src={streamer.thumbnailUrl}
          alt={`${streamer.streamerName} 썸네일`}
          className="streamer-thumbnail"
        />
        <div className="viewer-count">
          👁 {streamer.concurrentUserCount}
        </div>
      </div>
      <div className="info-wrapper">
        <div className="tag-container">
          {(streamer.tags && streamer.tags.length > 0 ? streamer.tags : ['talk']).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="live-title">
          {streamer.liveTitle}
        </div>
        <div className="streamer-name">
          {streamer.streamerName}
        </div>
        <div className="category">
          {streamer.category}
        </div>
        <div className="live-link-container">
        <a
          href={streamer.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-link"
        >
          Go to Live
        </a></div>
      </div>
    </div>
  );
};

export default StreamerCard;
