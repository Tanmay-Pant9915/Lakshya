'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function EngineeringQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const questions = [
    {
      question: "What is the main job of an engineer?",
      options: ["To write stories and poems", "To design and build things to solve problems", "To study animals and plants", "To sing and play music"],
      correct: "To design and build things to solve problems"
    },
    {
      question: "Which type of engineer would design a tall skyscraper or a long bridge?",
      options: ["Chemical engineer", "Civil engineer", "Computer engineer", "Aerospace engineer"],
      correct: "Civil engineer"
    },
    {
      question: "A pulley is a simple machine that uses a rope and a wheel to do what?",
      options: ["Change the color of an object", "Make an object heavier", "Help lift heavy objects", "Heat up an object"],
      correct: "Help lift heavy objects"
    },
    {
      question: "What is a key step in the engineering design process?",
      options: ["Making a guess", "Arguing with your friends", "Brainstorming and designing a solution", "Watching a movie"],
      correct: "Brainstorming and designing a solution"
    },
    {
      question: "Which of these materials is a good conductor of electricity?",
      options: ["Wood", "Plastic", "Copper", "Rubber"],
      correct: "Copper"
    },
    {
      question: "What is the force that resists motion when two surfaces are touching?",
      options: ["Gravity", "Lift", "Friction", "Thrust"],
      correct: "Friction"
    },
    {
      question: "Which type of engineer would create robots and automated machines?",
      options: ["Mechanical engineer", "Electrical engineer", "Biomedical engineer", "Robotics engineer"],
      correct: "Robotics engineer"
    },
    {
      question: "What is the purpose of a blueprint in engineering?",
      options: ["To tell a story about the project", "To list the names of the engineers", "A detailed plan or drawing of a building or machine", "A song about the project"],
      correct: "A detailed plan or drawing of a building or machine"
    },
    {
      question: "What is a key purpose of a prototype in engineering?",
      options: ["To sell a product immediately", "A test version of a product to see how it works", "To write a manual for a machine", "To get a patent for an idea"],
      correct: "A test version of a product to see how it works"
    },
    {
      question: "What do engineers use to make things stronger and more stable, like in a bridge?",
      options: ["Triangles", "Squares", "Circles", "Ovals"],
      correct: "Triangles"
    }
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
        localStorage.setItem('engineeringCompleted', 'true');
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
              subject: 'engineering',
              incrementCompleted: 1,
              score: finalScore * 10,
              badgesToAdd: finalScore >= 8 ? ['Engineering Innovator'] : []
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
              <h1 className="text-2xl font-bold text-emerald-600">⚙️ Engineering Quiz</h1>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition"
              >
                Back to Dashboard
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
                {/* Enhanced Celebration Animation */}
                {showCelebration && (
                  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {/* Confetti Animation */}
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
                
                {/* CSS for the confetti animation */}
                <style jsx>
                  {`
                    .confetti {
                      animation: fall 3s cubic-bezier(0.2, 0.8, 0.2, 1.5) infinite;
                    }
                    @keyframes fall {
                      0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 0;
                      }
                      50% {
                        opacity: 1;
                      }
                      100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                      }
                    }
                  `}
                </style>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
