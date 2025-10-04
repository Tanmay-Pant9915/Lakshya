'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ComingSoonPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedClass = localStorage.getItem('selectedClass');
      if (savedUsername) {
        setUsername(savedUsername);
        setSelectedClass(savedClass || '6');
      }
    }
  }, []);

  const handleBackToLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
      localStorage.removeItem('language');
      localStorage.removeItem('selectedClass');
    }
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Material Coming Soon!</h1>
            <p className="text-xl text-gray-600 mb-2">Hello {username || 'Learner'}!</p>
            <p className="text-lg text-gray-500">Class {selectedClass} content is currently under development</p>
          </div>

          {/* Coming Soon Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What's Coming Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg border border-emerald-200">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Class-Specific Content</h3>
                <p className="text-gray-600 text-sm">
                  We're developing age-appropriate content tailored specifically for Class {selectedClass} students, 
                  with curriculum-aligned topics and difficulty levels.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced Quizzes</h3>
                <p className="text-gray-600 text-sm">
                  More challenging quizzes and interactive exercises designed to match the learning 
                  objectives for Class {selectedClass} students.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enhanced Features</h3>
                <p className="text-gray-600 text-sm">
                  New features including progress tracking, personalized learning paths, 
                  and advanced analytics for better learning outcomes.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-lg border border-pink-200">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Communities</h3>
                <p className="text-gray-600 text-sm">
                  Connect with other Class {selectedClass} students, participate in group challenges, 
                  and learn together in a collaborative environment.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Development Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-gray-800">Class 6 Content</p>
                    <p className="text-sm text-gray-600">Complete with all subjects and quizzes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">⏳</div>
                  <div>
                    <p className="font-semibold text-gray-800">Class {selectedClass} Content</p>
                    <p className="text-sm text-gray-600">In development - Coming soon!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">⏳</div>
                  <div>
                    <p className="font-semibold text-gray-800">All Classes (7-12)</p>
                    <p className="text-sm text-gray-600">Planned for future releases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Available Content */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-3">Try Class 6 Content Now!</h3>
              <p className="mb-4 opacity-90">
                While we work on Class {selectedClass} content, you can explore our complete Class 6 material 
                to get a feel for the platform and learning experience.
              </p>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('selectedClass', '6');
                  }
                  router.push('/dashboard');
                }}
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Explore Class 6 Content
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">What would you like to do?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToLogin}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Choose Different Class
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('selectedClass', '6');
                  }
                  router.push('/dashboard');
                }}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transform transition"
              >
                Try Class 6 Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
