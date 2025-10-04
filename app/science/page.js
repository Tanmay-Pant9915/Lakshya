'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function ScienceHome() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [progressData, setProgressData] = useState(null);
  const [scienceCompleted, setScienceCompleted] = useState(false);
  const [science2Completed, setScience2Completed] = useState(false);

  const fetchProgressData = async (username) => {
    try {
      const response = await fetch(`/api/progress?userName=${encodeURIComponent(username)}`);
      const data = await response.json();
      if (data && data.progress) {
        setProgressData(data.progress);
        setScienceCompleted(data.progress.science?.quizzesCompleted > 0 || false);
        setScience2Completed(data.progress.science?.quizzesCompleted >= 2 || false);
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedLanguage = localStorage.getItem('language');
      const savedClass = localStorage.getItem('selectedClass');
      if (savedUsername) {
        setUsername(savedUsername);
        setLanguage(savedLanguage || 'English');
        setSelectedClass(savedClass || '6');
        fetchProgressData(savedUsername);
      }
    }
  }, []);

  useEffect(() => {
    // Listen for progress updates
    const handleStorageUpdate = () => {
      setScienceCompleted(localStorage.getItem('scienceCompleted') === 'true');
      setScience2Completed(localStorage.getItem('science2Completed') === 'true');
      if (username) {
        fetchProgressData(username);
      }
    };
    
    handleStorageUpdate();
    window.addEventListener('local-storage', handleStorageUpdate);
    
    return () => window.removeEventListener('local-storage', handleStorageUpdate);
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      <Navbar />
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username || 'Learner'}!</h1>
            <p className="text-gray-600 mt-1">Class {selectedClass || '6'} • Science</p>
            
            {/* Progress Display */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Science Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{scienceCompleted ? '✅' : '⏳'}</div>
                  <div className="text-sm text-gray-600">Quiz 1 {scienceCompleted ? 'Completed' : 'Pending'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{science2Completed ? '✅' : '⏳'}</div>
                  <div className="text-sm text-gray-600">Quiz 2 {science2Completed ? 'Completed' : 'Pending'}</div>
                </div>
              </div>
              {progressData && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>Total Score: {progressData.science?.lastScore || 0}</p>
                  <p>Best Score: {progressData.science?.bestScore || 0}</p>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              <button onClick={() => router.push('/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition">Back to Dashboard</button>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔬 Science Fundamentals</h2>
            
            {/* Food Chain & Ecosystems */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">🌱 Food Chains & Ecosystems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Producers in Food Chain</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Plants like grass are producers because they make their own food through photosynthesis. 
                    They form the base of every food chain.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> Grass → Deer → Lion
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Photosynthesis Process</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Plants use sunlight, water, and carbon dioxide to make glucose (food) and release oxygen. 
                    This is how plants produce their own energy.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Formula:</strong> CO₂ + H₂O + Light → Glucose + O₂
                  </div>
                </div>
              </div>
            </div>

            {/* Solar System & Space */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">🪐 Solar System & Space</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mars - The Red Planet</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Mars is called the "Red Planet" because of iron oxide (rust) on its surface. 
                    It's the fourth planet from the Sun and has two small moons.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Fun Fact:</strong> A day on Mars is about 24 hours and 37 minutes!
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">The Sun - Our Energy Source</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    The Sun is the main source of energy for Earth. It provides light and heat that 
                    drives weather, photosynthesis, and life on our planet.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Distance:</strong> About 93 million miles from Earth
                  </div>
                </div>
              </div>
            </div>

            {/* Matter & States */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">⚗️ Matter & States</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">States of Matter</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Solid:</strong> Has definite shape and volume (ice, rock)<br/>
                    <strong>Liquid:</strong> Has definite volume but no definite shape (water)<br/>
                    <strong>Gas:</strong> No definite shape or volume (air, steam)
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Temperature Measurement</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A thermometer measures temperature. It uses the expansion and contraction 
                    of liquids (like mercury) to show temperature changes.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Units:</strong> Celsius (°C) or Fahrenheit (°F)
                  </div>
                </div>
              </div>
            </div>

            {/* Forces & Physics */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">⚡ Forces & Physics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Gravity</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Gravity is the force that pulls objects towards the center of the Earth. 
                    It keeps us on the ground and makes things fall down.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> When you drop a ball, gravity pulls it down
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Earth's Atmosphere</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    The atmosphere is the protective layer of gases around Earth. It contains 
                    oxygen for breathing and protects us from harmful space radiation.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Main gases:</strong> Nitrogen (78%), Oxygen (21%)
                  </div>
                </div>
              </div>
            </div>

            {/* Plant Biology */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">🌿 Plant Biology</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Plant Roots</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Roots absorb water and nutrients from the soil. They also anchor the plant 
                    in the ground and store food for the plant.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Types:</strong> Tap roots, fibrous roots, aerial roots
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Cells - Building Blocks</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    The cell is the basic unit of all living organisms. All living things are 
                    made up of one or more cells that carry out life processes.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Types:</strong> Plant cells, animal cells, bacterial cells
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🧪 Test Your Knowledge</h2>
            <p className="text-gray-600 mb-4">Now that you've learned the concepts, test your understanding with our quizzes!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => router.push('/science/quiz')} className={`px-6 py-6 rounded-lg text-left hover:scale-105 transform transition ${
                scienceCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-emerald-400 to-blue-500'
              } text-white`}>
                <div className="text-2xl flex items-center justify-between">
                  <span>🔬 Quiz 1</span>
                  {scienceCompleted && <span>✅</span>}
                </div>
                <div className="text-sm text-white/90 mt-1">Food chains, solar system, matter, forces</div>
                {scienceCompleted && <div className="text-xs text-white/80 mt-1">Completed!</div>}
              </button>
              <button onClick={() => router.push('/science/quiz2')} className={`px-6 py-6 rounded-lg text-left hover:scale-105 transform transition ${
                science2Completed 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-sky-500 to-indigo-500'
              } text-white`}>
                <div className="text-2xl flex items-center justify-between">
                  <span>🧪 Quiz 2</span>
                  {science2Completed && <span>✅</span>}
                </div>
                <div className="text-sm text-white/90 mt-1">Advanced science concepts</div>
                {science2Completed && <div className="text-xs text-white/80 mt-1">Completed!</div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


