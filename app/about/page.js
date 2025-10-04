'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About LAKSHYA</h1>
            <p className="text-xl text-gray-600">Learn. Achieve. Grow.</p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              LAKSHYA is a comprehensive STEM learning platform designed to make education engaging, 
              interactive, and accessible for students from Class 6 to Class 12. We believe that 
              learning should be fun, rewarding, and tailored to each student's pace and interests.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🔬</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Science Explorer</h3>
                  <p className="text-gray-600">
                    Dive deep into physics, chemistry, and biology with interactive quizzes and 
                    comprehensive explanations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl">💻</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tech Trailblazer</h3>
                  <p className="text-gray-600">
                    Master programming concepts, AI fundamentals, and digital innovation through 
                    hands-on learning experiences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🔧</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Engineering Innovator</h3>
                  <p className="text-gray-600">
                    Build solutions and understand design principles with practical engineering 
                    challenges and projects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🧮</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Problem Solver</h3>
                  <p className="text-gray-600">
                    Conquer mathematics with logical thinking, step-by-step solutions, and 
                    comprehensive practice exercises.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Approach */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎓 Our Learning Approach</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Interactive Quizzes</h3>
                  <p className="text-gray-600">Engage with carefully crafted questions that test understanding and reinforce learning.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instant Feedback</h3>
                  <p className="text-gray-600">Get immediate explanations and corrections to learn from mistakes and improve.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Progress Tracking</h3>
                  <p className="text-gray-600">Monitor your learning journey with detailed progress reports and achievement badges.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Gamified Experience</h3>
                  <p className="text-gray-600">Earn points, unlock achievements, and compete on leaderboards to stay motivated.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Who Can Benefit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">🎒</div>
                <h3 className="font-semibold text-gray-800 mb-2">Students</h3>
                <p className="text-gray-600 text-sm">
                  Class 6-12 students looking to strengthen their STEM foundation and excel in academics.
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">👨‍🏫</div>
                <h3 className="font-semibold text-gray-800 mb-2">Teachers</h3>
                <p className="text-gray-600 text-sm">
                  Educators seeking interactive tools to supplement classroom teaching and track student progress.
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-semibold text-gray-800 mb-2">Parents</h3>
                <p className="text-gray-600 text-sm">
                  Parents wanting to support their children's learning journey with quality educational resources.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who are already mastering STEM subjects with LAKSHYA.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
