import axios from 'axios';
import type { LiveInfo } from '../types/Streamer.ts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLiveStreamers = async (): Promise<LiveInfo[]> => {
  try {
    // console.log('요청 URL:', `${API_BASE_URL}/api/streamers/live`); // 디버깅용
    const response = await axios.get(`${API_BASE_URL}/api/streamers/live`);
    // console.log("응답 데이터:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('라이브 스트리머 불러오기 실패:', error);
    return [];
  }
};