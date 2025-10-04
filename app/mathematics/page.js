'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function MathematicsHome() {
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
            <p className="text-gray-600 mt-1">Class {selectedClass || '6'} • Mathematics</p>
            <div className="mt-3">
              <button onClick={() => router.push('/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition">Back to Dashboard</button>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📐 Mathematics Fundamentals</h2>
            
            {/* Order of Operations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">🔢 Order of Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">PEMDAS Rule</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>P</strong>arentheses, <strong>E</strong>xponents, <strong>M</strong>ultiplication, 
                    <strong>D</strong>ivision, <strong>A</strong>ddition, <strong>S</strong>ubtraction
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> 4×(5+3)−6 = 4×8−6 = 32−6 = 26
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Step-by-Step Solving</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Always solve expressions in the correct order. Parentheses first, then 
                    exponents, then multiplication/division (left to right), then addition/subtraction.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Tip:</strong> Work from inside out, left to right
                  </div>
                </div>
              </div>
            </div>

            {/* Geometry & Shapes */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">📏 Geometry & Shapes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Rectangle Perimeter</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Perimeter = 2 × (length + width). Add all four sides together. 
                    For a rectangle with length 8 cm and width 5 cm: 2×(8+5) = 2×13 = 26 cm
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Formula:</strong> P = 2(l + w)
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Square Area</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Area = side × side = side². For a square with side 6 inches: 
                    6 × 6 = 36 square inches
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Formula:</strong> A = s²
                  </div>
                </div>
              </div>
            </div>

            {/* Fractions & Decimals */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">🔢 Fractions & Decimals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Converting Fractions to Decimals</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Divide the numerator by the denominator. 3/4 = 3 ÷ 4 = 0.75. 
                    Some common fractions: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Method:</strong> Long division or calculator
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Understanding Decimals</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Decimals show parts of a whole number. The decimal point separates 
                    whole numbers from fractional parts. 0.75 means 75 hundredths.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Place values:</strong> 0.75 = 7 tenths + 5 hundredths
                  </div>
                </div>
              </div>
            </div>

            {/* Algebra Basics */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">📊 Algebra Basics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Solving Simple Equations</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    To solve x + 7 = 15, subtract 7 from both sides: x = 15 - 7 = 8. 
                    Always do the same operation to both sides to keep the equation balanced.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Check:</strong> 8 + 7 = 15 ✓
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Variables & Unknowns</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Variables (like x, y, z) represent unknown numbers. We use algebra 
                    to find the value of these unknowns by solving equations.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Goal:</strong> Find what number the variable represents
                  </div>
                </div>
              </div>
            </div>

            {/* Number Theory */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">🔢 Number Theory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Prime Numbers</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Prime numbers have exactly two factors: 1 and themselves. 
                    Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Test:</strong> Can only be divided by 1 and itself
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Least Common Multiple (LCM)</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    LCM is the smallest number that both numbers divide into evenly. 
                    For 4 and 6: multiples of 4 (4,8,12...) and 6 (6,12...), so LCM = 12
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Use:</strong> Adding fractions with different denominators
                  </div>
                </div>
              </div>
            </div>

            {/* Percentages & Ratios */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">📈 Percentages & Ratios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Calculating Percentages</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    To find 25% of 80: 25% = 25/100 = 0.25, so 0.25 × 80 = 20. 
                    Percent means "per hundred" or "out of 100."
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Formula:</strong> Percentage × Number ÷ 100
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Ratios & Proportions</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A ratio compares two quantities. 10 red marbles to 5 blue marbles 
                    = 10:5 = 2:1 (simplified). Ratios show relative amounts.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Simplify:</strong> Divide both numbers by their greatest common factor
                  </div>
                </div>
              </div>
            </div>

            {/* Integers & Negative Numbers */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">🌡️ Integers & Negative Numbers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Negative Numbers</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Negative numbers are less than zero. They represent things like 
                    temperatures below freezing, depths below sea level, or debts.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> 5 degrees below zero = -5°C
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Number Line</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    The number line helps visualize positive and negative numbers. 
                    Zero is in the middle, positive numbers go right, negative numbers go left.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Visual:</strong> ...-3, -2, -1, 0, 1, 2, 3...
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
              <button onClick={() => router.push('/mathematics/quiz')} className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">📐 Quiz 1</div>
                <div className="text-sm text-white/90 mt-1">Order of operations, geometry, fractions, algebra</div>
              </button>
              <button onClick={() => router.push('/mathematics/quiz2')} className="bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">🧮 Quiz 2</div>
                <div className="text-sm text-white/90 mt-1">Advanced mathematics concepts</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


