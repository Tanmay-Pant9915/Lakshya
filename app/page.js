'use client';

import { useState, useEffect } from 'react';
import LoginPage from './login/page';
import Navbar from './components/Navbar';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedLanguage = localStorage.getItem('language');
      const savedClass = localStorage.getItem('selectedClass');
      
      if (savedUsername) {
        setIsLoggedIn(true);
        setUsername(savedUsername);
        setLanguage(savedLanguage || 'English');
        setSelectedClass(savedClass || '6');
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
      localStorage.removeItem('language');
      localStorage.removeItem('selectedClass');
    }
    setIsLoggedIn(false);
    setUsername('');
    setLanguage('');
    setSelectedClass('');
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Lakshya!</h1>
            <p className="text-xl text-gray-600 mb-6">Learn. Achieve. Grow</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">4</div>
              <div className="text-gray-600">Subjects Available</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
              <div className="text-gray-600">Quizzes to Complete</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600">Learning Opportunities</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => window.location.href = '/science'}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 p-4 rounded-lg transition duration-300"
              >
                <div className="text-2xl mb-2">🔬</div>
                <div className="font-semibold">Science</div>
              </button>
              <button
                onClick={() => window.location.href = '/technology'}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg transition duration-300"
              >
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold">Technology</div>
              </button>
              <button
                onClick={() => window.location.href = '/engineering'}
                className="bg-orange-100 hover:bg-orange-200 text-orange-800 p-4 rounded-lg transition duration-300"
              >
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">Engineering</div>
              </button>
              <button
                onClick={() => window.location.href = '/mathematics'}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg transition duration-300"
              >
                <div className="text-2xl mb-2">📐</div>
                <div className="font-semibold">Mathematics</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
