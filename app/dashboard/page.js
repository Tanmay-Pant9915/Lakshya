'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Score from '../components/Score';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [achievements, setAchievements] = useState({
    scienceCompleted: false,
    technologyCompleted: false,
    engineeringCompleted: false,
    mathematicsCompleted: false,
    science2Completed: false,
    technology2Completed: false,
    engineering2Completed: false,
    mathematics2Completed: false,
  });
  const [progressData, setProgressData] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const fetchProgressData = async (username) => {
    try {
      const response = await fetch(`/api/progress?userName=${encodeURIComponent(username)}`);
      const data = await response.json();
      if (data && data.progress) {
        setProgressData(data.progress);
        setTotalScore(data.progress.totalScore || 0);
        
        // Update achievements based on database data
        setAchievements(prev => ({
          ...prev,
          scienceCompleted: data.progress.science?.quizzesCompleted > 0 || false,
          technologyCompleted: data.progress.technology?.quizzesCompleted > 0 || false,
          engineeringCompleted: data.progress.engineering?.quizzesCompleted > 0 || false,
          mathematicsCompleted: data.progress.mathematics?.quizzesCompleted > 0 || false,
          science2Completed: data.progress.science?.quizzesCompleted >= 2 || false,
          technology2Completed: data.progress.technology?.quizzesCompleted >= 2 || false,
          engineering2Completed: data.progress.engineering?.quizzesCompleted >= 2 || false,
          mathematics2Completed: data.progress.mathematics?.quizzesCompleted >= 2 || false,
        }));
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedLanguage = localStorage.getItem('language');
      const savedClass = localStorage.getItem('selectedClass');
      
      if (savedUsername) {
        setUsername(savedUsername);
        setLanguage(savedLanguage || 'English');
        setSelectedClass(savedClass || '6');
        
        // Fetch progress data from database
        fetchProgressData(savedUsername);
        
        // Try to fetch from DB for authoritative class
        fetch('/api/users?' + new URLSearchParams({ name: savedUsername }))
          .then(res => res.json())
          .then(data => {
            if (data && data.user && data.user.class) {
              setSelectedClass(String(data.user.class));
            }
          })
          .catch(() => {});
      } else {
        // If no user data, redirect to home
        router.push('/');
      }
    }
  }, [router]);

  useEffect(() => {
    // Listen for score updates or navigation back from quizzes
    const handler = () => {
      if (typeof window !== 'undefined') {
        // Update from localStorage for immediate UI updates
        setAchievements({
          scienceCompleted: localStorage.getItem('scienceCompleted') === 'true',
          technologyCompleted: localStorage.getItem('technologyCompleted') === 'true',
          engineeringCompleted: localStorage.getItem('engineeringCompleted') === 'true',
          mathematicsCompleted: localStorage.getItem('mathematicsCompleted') === 'true',
          science2Completed: localStorage.getItem('science2Completed') === 'true',
          technology2Completed: localStorage.getItem('technology2Completed') === 'true',
          engineering2Completed: localStorage.getItem('engineering2Completed') === 'true',
          mathematics2Completed: localStorage.getItem('mathematics2Completed') === 'true',
        });
        
        // Also refresh from database to ensure consistency
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
          fetchProgressData(savedUsername);
        }
      }
    };
    handler();
    window.addEventListener('local-storage', handler);
    return () => window.removeEventListener('local-storage', handler);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header + Compact Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username || 'Learner'}!</h1>
            <p className="text-gray-600 mt-1">Class {selectedClass || '6'} • Ready to learn something new today?</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-gray-500">Badges Earned</div>
                <div className="text-xl font-semibold">{[achievements.scienceCompleted, achievements.technologyCompleted, achievements.engineeringCompleted, achievements.mathematicsCompleted].filter(Boolean).length}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-gray-500">Quizzes Completed</div>
                <div className="text-xl font-semibold">{[achievements.scienceCompleted, achievements.science2Completed, achievements.technologyCompleted, achievements.technology2Completed, achievements.engineeringCompleted, achievements.engineering2Completed, achievements.mathematicsCompleted, achievements.mathematics2Completed].filter(Boolean).length}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-gray-500">Total Score</div>
                <div className="text-xl font-semibold text-emerald-600">{totalScore}</div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Science Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="h-32">
                  <img 
                    src="/science.jpg" 
                    alt="Science laboratory with equipment and molecular structures"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Science</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>{achievements.scienceCompleted ? '100% Complete' : '0% Complete'}</span>
                    <span>24 Lessons</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-emerald-500 rounded-full" style={{ width: achievements.scienceCompleted ? '100%' : '0%' }}></div>
                  </div>
                  <button onClick={() => router.push('/science')} className="mt-4 w-full border border-gray-300 hover:border-emerald-500 text-gray-800 hover:text-emerald-700 rounded-lg py-2 font-medium transition">Continue Learning</button>
                </div>
              </div>

              {/* Technology Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="h-32">
                  <img 
                    src="/technology.jpg" 
                    alt="Technology and computer science"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Technology</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>{achievements.technologyCompleted ? '100% Complete' : '0% Complete'}</span>
                    <span>18 Lessons</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: achievements.technologyCompleted ? '100%' : '0%' }}></div>
                  </div>
                  <button onClick={() => router.push('/technology')} className="mt-4 w-full border border-gray-300 hover:border-emerald-500 text-gray-800 hover:text-emerald-700 rounded-lg py-2 font-medium transition">Continue Learning</button>
                </div>
              </div>

              {/* Engineering Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="h-32">
                  <img 
                    src="/engineering.jpg" 
                    alt="Engineering and mechanical design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Engineering</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>{achievements.engineeringCompleted ? '100% Complete' : '0% Complete'}</span>
                    <span>15 Lessons</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: achievements.engineeringCompleted ? '100%' : '0%' }}></div>
                  </div>
                  <button onClick={() => router.push('/engineering')} className="mt-4 w-full border border-gray-300 hover:border-emerald-500 text-gray-800 hover:text-emerald-700 rounded-lg py-2 font-medium transition">Continue Learning</button>
                </div>
              </div>

              {/* Mathematics Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="h-32">
                  <img 
                    src="/maths.jpg" 
                    alt="Mathematics and mathematical concepts"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Mathematics</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>{achievements.mathematicsCompleted ? '100% Complete' : '0% Complete'}</span>
                    <span>32 Lessons</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: achievements.mathematicsCompleted ? '100%' : '0%' }}></div>
                  </div>
                  <button onClick={() => router.push('/mathematics')} className="mt-4 w-full border border-gray-300 hover:border-emerald-500 text-gray-800 hover:text-emerald-700 rounded-lg py-2 font-medium transition">Continue Learning</button>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Panel */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 mt-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Science Explorer */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.scienceCompleted ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">🔬</div>
                <div className="font-semibold">Science Explorer</div>
                <div className="text-xs text-gray-500 mt-1">Complete Science quiz</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.scienceCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{achievements.scienceCompleted ? 'Unlocked' : 'Locked'}</span>
              </div>

              {/* Tech Trailblazer */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.technologyCompleted ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">💻</div>
                <div className="font-semibold">Tech Trailblazer</div>
                <div className="text-xs text-gray-500 mt-1">Complete Technology quiz</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.technologyCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{achievements.technologyCompleted ? 'Unlocked' : 'Locked'}</span>
              </div>

              {/* Engineering Innovator */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.engineeringCompleted ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">⚙️</div>
                <div className="font-semibold">Engineering Innovator</div>
                <div className="text-xs text-gray-500 mt-1">Complete Engineering quiz</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.engineeringCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{achievements.engineeringCompleted ? 'Unlocked' : 'Locked'}</span>
              </div>

              {/* Problem Solver (Mathematics) */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.mathematicsCompleted ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">📐</div>
                <div className="font-semibold">Problem Solver</div>
                <div className="text-xs text-gray-500 mt-1">Complete Mathematics quiz</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.mathematicsCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{achievements.mathematicsCompleted ? 'Unlocked' : 'Locked'}</span>
              </div>
            </div>

            {/* Special Achievement Badges */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Master Badge */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.scienceCompleted && achievements.technologyCompleted && achievements.engineeringCompleted && achievements.mathematicsCompleted ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-semibold text-lg">Master</div>
                <div className="text-xs text-gray-500 mt-1">Complete all quizzes</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.scienceCompleted && achievements.technologyCompleted && achievements.engineeringCompleted && achievements.mathematicsCompleted ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {achievements.scienceCompleted && achievements.technologyCompleted && achievements.engineeringCompleted && achievements.mathematicsCompleted ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              {/* Early Bird Badge */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${achievements.scienceCompleted || achievements.technologyCompleted || achievements.engineeringCompleted || achievements.mathematicsCompleted ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">🌅</div>
                <div className="font-semibold text-lg">Early Bird</div>
                <div className="text-xs text-gray-500 mt-1">Complete your first quiz</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${achievements.scienceCompleted || achievements.technologyCompleted || achievements.engineeringCompleted || achievements.mathematicsCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {achievements.scienceCompleted || achievements.technologyCompleted || achievements.engineeringCompleted || achievements.mathematicsCompleted ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              {/* Fast Learner Badge */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${[achievements.scienceCompleted, achievements.technologyCompleted, achievements.engineeringCompleted, achievements.mathematicsCompleted].filter(Boolean).length >= 3 ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-semibold text-lg">Fast Learner</div>
                <div className="text-xs text-gray-500 mt-1">Complete 3+ subjects</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${[achievements.scienceCompleted, achievements.technologyCompleted, achievements.engineeringCompleted, achievements.mathematicsCompleted].filter(Boolean).length >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {[achievements.scienceCompleted, achievements.technologyCompleted, achievements.engineeringCompleted, achievements.mathematicsCompleted].filter(Boolean).length >= 3 ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              {/* Late Learner Badge */}
              <div className={`border-2 rounded-lg p-4 text-center transition ${[achievements.science2Completed, achievements.technology2Completed, achievements.engineering2Completed, achievements.mathematics2Completed].filter(Boolean).length >= 2 ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">🌙</div>
                <div className="font-semibold text-lg">Late Learner</div>
                <div className="text-xs text-gray-500 mt-1">Complete 2+ Quiz 2s</div>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${[achievements.science2Completed, achievements.technology2Completed, achievements.engineering2Completed, achievements.mathematics2Completed].filter(Boolean).length >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {[achievements.science2Completed, achievements.technology2Completed, achievements.engineering2Completed, achievements.mathematics2Completed].filter(Boolean).length >= 2 ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
