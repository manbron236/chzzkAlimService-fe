import axios from 'axios';
import type { LiveInfo } from '../types/Streamer.ts';

// 환경변수 대신 하드코딩으로 변경
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://www.mjdev.kr'      // 프로덕션 (빌드된 버전)
  : 'http://localhost:8080';    // 개발 (npm run dev)

export const fetchLiveStreamers = async (): Promise<LiveInfo[]> => {
  try {
    console.log('요청 URL:', `${API_BASE_URL}/api/streamers/live`); // 디버깅용
    const response = await axios.get(`${API_BASE_URL}/api/streamers/live`);
    console.log("응답 데이터:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('라이브 스트리머 불러오기 실패:', error);
    return [];
  }
};