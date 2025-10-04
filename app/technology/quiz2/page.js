'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function TechnologyQuiz2() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const questions = [
    {
      question: 'What kind of energy is produced by moving water?',
      options: ['Solar energy', 'Wind energy', 'Hydroelectric energy', 'Thermal energy'],
      correct: 'Hydroelectric energy',
    },
    {
      question: 'What simple machine is a ramp used to move heavy objects upward?',
      options: ['Lever', 'Inclined plane', 'Pulley', 'Wheel and axle'],
      correct: 'Inclined plane',
    },
    {
      question: 'In electronics, what does LED stand for?',
      options: ['Light Emitting Diode', 'Large Energy Device', 'Light Energy Detector', 'Low Emission Diode'],
      correct: 'Light Emitting Diode',
    },
    {
      question: 'What is the primary purpose of a bridge?',
      options: ['To block water flow', 'To allow vehicles and people to cross obstacles', 'To store energy', 'To generate electricity'],
      correct: 'To allow vehicles and people to cross obstacles',
    },
    {
      question: 'What is the unit used to measure force in physics?',
      options: ['Meter', 'Newton', 'Joule', 'Watt'],
      correct: 'Newton',
    },
    {
      question: 'Which material is commonly used to make electrical wires?',
      options: ['Plastic', 'Copper', 'Rubber', 'Wood'],
      correct: 'Copper',
    },
    {
      question: 'Which invention helps us send messages over long distances instantly?',
      options: ['Radio', 'Telegraph', 'Telephone', 'Telegraph and Telephone both'],
      correct: 'Telegraph and Telephone both',
    },
    {
      question: 'What part of a car helps it stop when brakes are applied?',
      options: ['Engine', 'Tires', 'Brakes', 'Steering wheel'],
      correct: 'Brakes',
    },
    {
      question: 'What type of energy transformation occurs in a battery-powered flashlight?',
      options: ['Electrical to light energy', 'Light to electrical energy', 'Mechanical to electrical energy', 'Chemical to mechanical energy'],
      correct: 'Electrical to light energy',
    },
    {
      question: 'Which of the following is NOT a type of renewable energy?',
      options: ['Solar', 'Wind', 'Coal', 'Geothermal'],
      correct: 'Coal',
    },
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    const nextAnswers = [...userAnswers];
    nextAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      const finalScore = nextAnswers.reduce((sum, ans, idx) => sum + (ans === questions[idx].correct ? 1 : 0), 0);
      setScore(finalScore);
      setShowResult(true);
      setShowCelebration(true);
      
      try {
        // Save to localStorage for immediate UI updates
        localStorage.setItem('technology2Completed', 'true');
        localStorage.setItem('technologyCompleted', 'true');
        const currentTotalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
        localStorage.setItem('totalScore', currentTotalScore + finalScore * 10);
        
        // Save to database
        const username = localStorage.getItem('username');
        const userClass = localStorage.getItem('selectedClass');
        
        if (username && userClass) {
          await fetch('/api/progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: username,
              class: userClass,
              subject: 'technology',
              incrementCompleted: 1,
              score: finalScore * 10,
              badgesToAdd: finalScore >= 8 ? ['Tech Trailblazer'] : []
            }),
          });
        }
      } catch (e) {
        console.error('Error saving progress:', e);
      }
      
      window.dispatchEvent(new Event('local-storage'));
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-white">
      <Navbar />
      
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-emerald-600">💻 Technology Quiz 2</h1>
              <button
                onClick={() => router.push('/technology')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition"
              >
                Back to Technology
              </button>
            </div>

            {!showResult ? (
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full p-3 text-left rounded-lg border-2 transition ${
                          selectedAnswer === option
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            ) : (
              <div className="text-center relative">
                {showCelebration && (
                  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="confetti absolute w-2 h-2 rounded-full"
                        style={{
                          left: `${Math.random() * 100}vw`,
                          top: `${Math.random() * 100}vh`,
                          animationDelay: `${Math.random() * 2}s`,
                          backgroundColor: `hsl(${Math.random() * 360}, 100%, 75%)`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}
                
                <div className="relative z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-emerald-200 border-opacity-50 p-8 transform transition-all duration-500">
                  <h2 className="text-3xl font-bold text-emerald-600 mb-4 animate-pulse">Quiz Complete!</h2>
                  <p className="text-xl mb-4 font-semibold">Your Score: {score} out of {questions.length}</p>
                  <div className="text-left max-h-80 overflow-auto mb-6">
                    {questions.map((q, idx) => (
                      <div key={idx} className="mb-3 p-3 rounded border">
                        <div className="font-medium mb-1">Q{idx + 1}. {q.question}</div>
                        <div className="text-sm"><span className="font-semibold">Your answer:</span> {userAnswers[idx] || '—'}</div>
                        <div className="text-sm text-emerald-700"><span className="font-semibold">Correct answer:</span> {q.correct}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleRestart}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-lg"
                  >
                    Try Again
                  </button>
                </div>

                <style jsx>{`
                  .confetti {
                    animation: fall 3s cubic-bezier(0.2, 0.8, 0.2, 1.5) infinite;
                  }
                  @keyframes fall {
                    0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


