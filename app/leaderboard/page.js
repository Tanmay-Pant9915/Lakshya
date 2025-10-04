'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function LeaderboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      } else {
        // If no user data, redirect to home
        router.push('/');
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all users from the database
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        
        if (!usersData.users || usersData.users.length === 0) {
          setLeaderboard([]);
          setLoading(false);
          return;
        }

        // Fetch progress data for all users
        const leaderboardData = await Promise.all(
          usersData.users.map(async (user) => {
            try {
              const progressResponse = await fetch(`/api/progress?userName=${encodeURIComponent(user.name)}`);
              const progressData = await progressResponse.json();
              
              const progress = progressData.progress;
              if (!progress) {
                return {
                  name: user.name,
                  class: user.class,
                  totalScore: 0,
                  quizzesCompleted: 0,
                  subjects: {
                    science: 0,
                    technology: 0,
                    engineering: 0,
                    mathematics: 0
                  }
                };
              }

              // Calculate total quizzes completed and total score
              const scienceQuizzes = progress.science?.quizzesCompleted || 0;
              const technologyQuizzes = progress.technology?.quizzesCompleted || 0;
              const engineeringQuizzes = progress.engineering?.quizzesCompleted || 0;
              const mathematicsQuizzes = progress.mathematics?.quizzesCompleted || 0;
              
              const totalQuizzesCompleted = scienceQuizzes + technologyQuizzes + engineeringQuizzes + mathematicsQuizzes;
              const totalScore = progress.totalScore || 0;

              return {
                name: user.name,
                class: user.class,
                totalScore: totalScore,
                quizzesCompleted: totalQuizzesCompleted,
                subjects: {
                  science: scienceQuizzes,
                  technology: technologyQuizzes,
                  engineering: engineeringQuizzes,
                  mathematics: mathematicsQuizzes
                },
                lastUpdated: progress.updatedAt || progress.createdAt
              };
            } catch (error) {
              console.error(`Error fetching progress for ${user.name}:`, error);
              return {
                name: user.name,
                class: user.class,
                totalScore: 0,
                quizzesCompleted: 0,
                subjects: {
                  science: 0,
                  technology: 0,
                  engineering: 0,
                  mathematics: 0
                }
              };
            }
          })
        );

        // Sort by total score (descending), then by quizzes completed (descending)
        const sortedLeaderboard = leaderboardData.sort((a, b) => {
          if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
          }
          return b.quizzesCompleted - a.quizzesCompleted;
        });

        // Add rank to each user
        const rankedLeaderboard = sortedLeaderboard.map((user, index) => ({
          ...user,
          rank: index + 1
        }));

        setLeaderboard(rankedLeaderboard);

        // Find current user's rank
        const currentUserIndex = rankedLeaderboard.findIndex(user => user.name === username);
        setUserRank(currentUserIndex >= 0 ? currentUserIndex + 1 : rankedLeaderboard.length + 1);

      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchLeaderboardData();
    }
    
    // Listen for updates
    const handleStorageUpdate = () => {
      if (username) {
        fetchLeaderboardData();
      }
    };
    window.addEventListener('local-storage', handleStorageUpdate);
    
    return () => window.removeEventListener('local-storage', handleStorageUpdate);
  }, [username]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 2:
        return 'bg-gray-100 border-gray-300 text-gray-800';
      case 3:
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-white border-gray-200 text-gray-700';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getProgressBarColor = (quizzesCompleted) => {
    if (quizzesCompleted >= 6) return 'bg-emerald-500';
    if (quizzesCompleted >= 4) return 'bg-blue-500';
    if (quizzesCompleted >= 2) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
        <Navbar />
        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading leaderboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🏆 Leaderboard</h1>
            <p className="text-xl text-gray-600">See how you rank among your peers!</p>
          </div>

          {/* User's Current Status */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Current Rank</h2>
                <p className="text-lg opacity-90">
                  {getRankIcon(userRank)} Position #{userRank}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Total Score</p>
                <p className="text-3xl font-bold">
                  {leaderboard.find(user => user.name === username)?.totalScore || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top Performers</h2>
            
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Students Yet</h3>
                <p className="text-gray-600">Be the first to complete quizzes and appear on the leaderboard!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      user.name === username 
                        ? 'bg-emerald-50 border-emerald-300 shadow-md' 
                        : getRankColor(user.rank)
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold">
                          {getRankIcon(user.rank)}
                        </div>
                        <div>
                          <h3 className={`font-semibold text-lg ${
                            user.name === username ? 'text-emerald-700' : ''
                          }`}>
                            {user.name}
                            {user.name === username && ' (You)'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Class {user.class} • {user.quizzesCompleted} quizzes completed
                          </p>
                          <div className="flex space-x-2 mt-1">
                            {user.subjects.science > 0 && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">🔬 Science</span>}
                            {user.subjects.technology > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">💻 Tech</span>}
                            {user.subjects.engineering > 0 && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">⚙️ Engineering</span>}
                            {user.subjects.mathematics > 0 && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">📐 Math</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(user.totalScore)}`}>
                          {user.totalScore}
                        </div>
                        <p className="text-sm text-gray-600">Total Score</p>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${getProgressBarColor(user.quizzesCompleted)}`}
                            style={{ width: `${Math.min((user.quizzesCompleted / 8) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Summary */}
          {leaderboard.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Leaderboard Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{leaderboard.length}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, user) => sum + user.totalScore, 0) / leaderboard.length) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, user) => sum + user.quizzesCompleted, 0) / leaderboard.length) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Avg Quizzes Completed</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}