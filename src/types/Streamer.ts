export interface LiveInfo {
  streamerId: string;
  streamerName: string;
  thumbnailUrl: string;
  liveUrl: string;
  live: boolean;
  liveTitle: string;
  tags: string[];
  category: string;
  concurrentUserCount: number;
}
