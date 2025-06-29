import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Loader2, RefreshCw, Users, Sparkles, AlertCircle, TrendingUp } from 'lucide-react';
import { fetchLiveStreamers } from '../api/streamerApi.ts';
import type { LiveInfo } from '../types/Streamer.ts';
import StreamerCard from '../components/StreamerCard.tsx';

const ChzzkPage: React.FC = () => {
  const [liveStreamers, setLiveStreamers] = useState<LiveInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadStreamers = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const data = await fetchLiveStreamers();
      setLiveStreamers(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (err) {
      setError('스트리머 정보를 불러오는데 실패했습니다.');
      console.error('Error loading streamers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStreamers();
    
    // 5분마다 자동 새로고침
    const interval = setInterval(() => {
      loadStreamers(false);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  // 총 시청자 수 계산
  const totalViewers = liveStreamers.reduce((acc, streamer) => acc + streamer.concurrentUserCount, 0);

  return (
    <div className="min-h-screen pt-16">
      {/* 히어로 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 bg-gradient-to-b from-chzzk-500/10 to-transparent" />
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-chzzk-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center space-x-3 mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-chzzk-400 to-chzzk-600 rounded-2xl flex items-center justify-center shadow-xl animate-glow">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              치지직
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300 mb-8 leading-relaxed"
          >
            지금 바로 시청할 수 있는 라이브 스트림을 확인하세요
          </motion.p>

          {/* 통계 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-6 py-4 text-center hover-glow"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-chzzk-400" />
                <span className="text-2xl font-bold text-white">{liveStreamers.length}</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">라이브 스트리머</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-6 py-4 text-center hover-glow"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-primary-400" />
                <span className="text-2xl font-bold text-white">
                  {totalViewers.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium">총 시청자 수</p>
            </motion.div>

            {liveStreamers.length > 0 && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-card px-6 py-4 text-center hover-glow"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {Math.round(totalViewers / liveStreamers.length).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-medium">평균 시청자</p>
              </motion.div>
            )}
          </motion.div>

          {/* 새로고침 버튼 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => loadStreamers()}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-chzzk-500/20 hover:bg-chzzk-500/30 border border-chzzk-500/50 rounded-full text-chzzk-300 hover:text-chzzk-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium">{loading ? '새로고침 중...' : '새로고침'}</span>
          </motion.button>

          {/* 마지막 업데이트 시간 */}
          {lastUpdated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-slate-400 mt-4"
            >
              마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
            </motion.p>
          )}
        </div>
      </motion.section>

      {/* 스트리머 카드 섹션 */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {loading && liveStreamers.length === 0 ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="glass-card max-w-md mx-auto p-8">
                  <Loader2 className="w-12 h-12 text-chzzk-400 animate-spin mx-auto mb-4" />
                  <p className="text-xl text-slate-300 mb-2">스트리머 정보를 불러오는 중...</p>
                  <p className="text-sm text-slate-400">잠시만 기다려주세요</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="glass-card max-w-md mx-auto p-8">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">오류가 발생했습니다</h3>
                  <p className="text-slate-300 mb-6">{error}</p>
                  <motion.button
                    onClick={() => loadStreamers()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300 font-medium"
                  >
                    다시 시도
                  </motion.button>
                </div>
              </motion.div>
            ) : liveStreamers.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="glass-card max-w-md mx-auto p-8">
                  <div className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tv className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">현재 방송 중인 스트리머가 없습니다</h3>
                  <p className="text-slate-300 mb-6">잠시 후 다시 확인해보세요!</p>
                  <motion.button
                    onClick={() => loadStreamers()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-chzzk-500/20 hover:bg-chzzk-500/30 border border-chzzk-500/50 rounded-xl text-chzzk-300 hover:text-chzzk-200 transition-all duration-300 font-medium"
                  >
                    새로고침
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* 섹션 헤더 */}
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    🔴 현재 방송 중인 스트리머
                  </h2>
                  <p className="text-slate-400 text-lg">
                    {liveStreamers.length}명의 스트리머가 현재 라이브 방송 중입니다
                  </p>
                </motion.div>

                {/* 스트리머 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {liveStreamers.map((streamer, index) => (
                    streamer?.streamerId ? (
                      <StreamerCard 
                        key={streamer.streamerId} 
                        streamer={streamer} 
                        index={index}
                      />
                    ) : null
                  ))}
                </div>

                {/* 로딩 중일 때 추가 표시 */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-8"
                  >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full text-chzzk-300">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">업데이트 중...</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default ChzzkPage;