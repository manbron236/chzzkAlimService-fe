import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ExternalLink, Play, Users, Hash } from 'lucide-react';
import type { LiveInfo } from '../types/Streamer.ts';

interface Props {
  streamer: LiveInfo;
  index?: number;
}

const StreamerCard: React.FC<Props> = ({ streamer, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const tags = streamer.tags && streamer.tags.length > 0 ? streamer.tags : ['talk'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        transition: { duration: 0.3 } 
      }}
      className="group relative w-full max-w-sm mx-auto"
    >
      {/* 메인 카드 */}
      <div className="glass-card overflow-hidden hover-glow transition-all duration-500 group-hover:border-chzzk-400/50">
        {/* 썸네일 섹션 */}
        <div className="relative aspect-video overflow-hidden">
          {/* 로딩 스켈레톤 */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent animate-shimmer" />
            </div>
          )}
          
          {/* 썸네일 이미지 */}
          {!imageError && (
            <motion.img
              src={streamer.thumbnailUrl}
              alt={`${streamer.streamerName} 썸네일`}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          
          {/* 에러 시 대체 이미지 */}
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">썸네일 로드 실패</p>
              </div>
            </div>
          )}

          {/* 라이브 배지 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <span>LIVE</span>
          </motion.div>

          {/* 시청자 수 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-3 right-3 glass-effect text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>{formatViewerCount(streamer.concurrentUserCount)}</span>
          </motion.div>

          {/* 호버 시 플레이 버튼 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-chzzk-500 rounded-full flex items-center justify-center shadow-lg hover:bg-chzzk-400 transition-colors cursor-pointer"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </motion.div>
        </div>

        {/* 카드 내용 */}
        <div className="p-6 space-y-4">
          {/* 태그들 */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-chzzk-500/20 text-chzzk-300 rounded-full text-xs font-medium border border-chzzk-500/30"
              >
                <Hash className="w-3 h-3" />
                <span>{tag}</span>
              </motion.span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 bg-slate-500/20 text-slate-300 rounded-full text-xs font-medium">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* 제목 */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
              {streamer.liveTitle}
            </h3>
          </div>

          {/* 스트리머 정보 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-chzzk-400 to-primary-400 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{streamer.streamerName}</p>
                <p className="text-sm text-slate-400">{streamer.category}</p>
              </div>
            </div>
          </div>

          {/* 시청 버튼 */}
          <motion.a
            href={streamer.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-chzzk-500 to-chzzk-600 hover:from-chzzk-600 hover:to-chzzk-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-chzzk-500/25"
          >
            <span>시청하기</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* 글로우 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-chzzk-500/20 to-primary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default StreamerCard;