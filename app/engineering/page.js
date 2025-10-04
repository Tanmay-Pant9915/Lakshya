'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function EngineeringHome() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedLanguage = localStorage.getItem('language');
      const savedClass = localStorage.getItem('selectedClass');
      if (savedUsername) {
        setUsername(savedUsername);
        setLanguage(savedLanguage || 'English');
        setSelectedClass(savedClass || '6');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      <Navbar />
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username || 'Learner'}!</h1>
            <p className="text-gray-600 mt-1">Class {selectedClass || '6'} • Engineering</p>
            <div className="mt-3">
              <button onClick={() => router.push('/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition">Back to Dashboard</button>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Engineering Fundamentals</h2>
            
            {/* What is Engineering */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">🔧 What is Engineering?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Engineer's Main Job</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Engineers design and build things to solve problems. They use science, 
                    math, and creativity to create solutions that make life better and easier.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Bridges, phones, medical devices, clean water systems
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Engineering Design Process</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Engineers follow a systematic approach: identify problems, brainstorm solutions, 
                    design, test prototypes, and improve their designs based on results.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Steps:</strong> Problem → Ideas → Design → Test → Improve
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Engineering */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">🏗️ Types of Engineering</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Civil Engineering</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Civil engineers design and build infrastructure like buildings, bridges, 
                    roads, and water systems. They create the structures we use every day.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Projects:</strong> Skyscrapers, highways, dams, airports
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Robotics Engineering</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Robotics engineers create robots and automated machines. They combine 
                    mechanical, electrical, and computer engineering to build smart machines.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Factory robots, medical robots, space rovers
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Machines & Forces */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">⚡ Simple Machines & Forces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pulley Systems</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A pulley uses a rope and wheel to help lift heavy objects. It changes 
                    the direction of force, making it easier to lift things upward.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Flagpoles, cranes, window blinds
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Friction Force</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Friction is the force that resists motion when two surfaces touch. 
                    Engineers must consider friction when designing moving parts and systems.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Car brakes, shoe soles, machine bearings
                  </div>
                </div>
              </div>
            </div>

            {/* Materials & Conductivity */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">🔌 Materials & Conductivity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Electrical Conductors</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Good conductors:</strong> Copper, aluminum, silver (allow electricity to flow easily)<br/>
                    <strong>Insulators:</strong> Wood, plastic, rubber (block electricity flow)
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Use:</strong> Conductors for wires, insulators for safety
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Material Properties</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Engineers choose materials based on properties like strength, flexibility, 
                    conductivity, and cost. Different projects need different materials.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Considerations:</strong> Strength, weight, cost, durability
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering Tools & Documentation */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">📐 Engineering Tools & Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Blueprints & Plans</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Blueprints are detailed technical drawings that show exactly how to build 
                    something. They include measurements, materials, and construction steps.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Purpose:</strong> Communication, planning, quality control
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Prototypes & Testing</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A prototype is a test version of a product. Engineers build prototypes 
                    to see how their designs work before making the final product.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Benefits:</strong> Find problems early, test ideas, save money
                  </div>
                </div>
              </div>
            </div>

            {/* Structural Design */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">🏗️ Structural Design</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Triangular Structures</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Triangles are the strongest geometric shape. Engineers use triangular 
                    designs in bridges, towers, and buildings to make them stronger and more stable.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Bridge trusses, Eiffel Tower, roof supports
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Load Distribution</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Engineers design structures to distribute weight and forces evenly. 
                    This prevents weak points and makes buildings and bridges safer.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Principles:</strong> Balance, support, strength, stability
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
              <button onClick={() => router.push('/engineering/quiz')} className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">⚙️ Quiz 1</div>
                <div className="text-sm text-white/90 mt-1">Engineering basics, machines, forces, materials</div>
              </button>
              <button onClick={() => router.push('/engineering/quiz2')} className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">🛠️ Quiz 2</div>
                <div className="text-sm text-white/90 mt-1">Advanced engineering concepts</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


