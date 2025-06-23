import React, { useEffect, useState } from 'react';
import { fetchLiveStreamers } from '../api/streamerApi';
import type { LiveInfo } from '../types/Streamer';
import StreamerCard from '../components/StreamerCard';

const ChzzkPage: React.FC = () => {
  const [liveStreamers, setLiveStreamers] = useState<LiveInfo[]>([]);

  useEffect(() => {
    const loadStreamers = async () => {
      const data = await fetchLiveStreamers();
      console.log('🎯 받은 데이터:', data); // 추가
      setLiveStreamers(data);
    };
    loadStreamers();
  }, []);

  return (
  <div style={{ padding: '20px' }}>
    <h2>치지직 방송 중 스트리머</h2>
    {liveStreamers.length === 0 ? (
      <p>현재 방송 중인 스트리머가 없습니다.</p>
    ) : (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {liveStreamers.map((streamer) => (
          <StreamerCard key={streamer.streamerId} streamer={streamer} />
        ))}
      </div>
    )}
  </div>
);
};

export default ChzzkPage;
