'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Get username from localStorage
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
      localStorage.removeItem('language');
      localStorage.removeItem('selectedClass');
      localStorage.removeItem('totalScore');
      localStorage.removeItem('scienceCompleted');
      localStorage.removeItem('science2Completed');
      localStorage.removeItem('technologyCompleted');
      localStorage.removeItem('technology2Completed');
      localStorage.removeItem('engineeringCompleted');
      localStorage.removeItem('engineering2Completed');
      localStorage.removeItem('mathematicsCompleted');
      localStorage.removeItem('mathematics2Completed');
    }
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo on LHS */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-emerald-600">LAKSHYA</h1>
        </div>
        
        {/* Navigation links and Avatar menu on RHS */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <button
            onClick={() => router.push('/about')}
            className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            ABOUT
          </button>
          <button
            onClick={() => router.push('/leaderboard')}
            className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            LEADERBOARD
          </button>
          
          {/* Avatar menu */}
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold cursor-pointer select-none"
              onClick={() => setMenuOpen(!menuOpen)}
              title={username || 'User'}
            >
              {(username || 'U').charAt(0).toUpperCase()}
            </div>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
