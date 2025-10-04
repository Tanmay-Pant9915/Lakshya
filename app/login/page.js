'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("6");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }

    // Persist locally for existing flows
    if (typeof window !== "undefined") {
      localStorage.setItem("username", name);
      localStorage.setItem("language", "English");
      localStorage.setItem("selectedClass", selectedClass);
    }

    // Persist to database
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, class: selectedClass })
      });
    } catch (e) {
      console.error('Failed to save user', e);
    }

    // Redirect to coming soon page for classes other than 6th
    if (selectedClass !== "6") {
      router.push("/coming-soon");
    } else {
      router.push("/dashboard");
    }
  };

  const slides = [
    {
      title: "Master STEM Subjects",
      content: "Dive deep into Science, Technology, Engineering, and Mathematics with our comprehensive quiz system. Each subject offers two levels of quizzes designed to challenge and enhance your understanding.",
      features: [
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          ), 
          title: "Science Explorer", 
          description: "Discover the wonders of physics, chemistry, and biology",
          color: "blue"
        },
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          ), 
          title: "Tech Trailblazer", 
          description: "Master programming, AI, and digital innovation",
          color: "purple"
        }
      ]
    },
    {
      title: "Gamified Learning Experience",
      content: "Take interesting quizzes with instant feedback and detailed explanations. Earn badges, track your progress, and unlock achievements as you complete quizzes.",
      features: [
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21l-1.25.5c-.5.2-1.28.2-1.78 0l-1.25-.5A1.25 1.25 0 0 1 4 17v-2.34"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21l1.25.5c.5.2 1.28.2 1.78 0l1.25-.5A1.25 1.25 0 0 0 20 17v-2.34"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          ), 
          title: "Engineering Innovator", 
          description: "Build solutions and understand design principles",
          color: "green"
        },
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM9 9h6v6H9z"></path>
              <path d="M9 1v6"></path>
              <path d="M15 1v6"></path>
              <path d="M9 17v6"></path>
              <path d="M15 17v6"></path>
              <path d="M1 9h6"></path>
              <path d="M17 9h6"></path>
              <path d="M1 15h6"></path>
              <path d="M17 15h6"></path>
            </svg>
          ), 
          title: "Problem Solver", 
          description: "Conquer mathematics with logical thinking and practice",
          color: "orange"
        },
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21l-1.25.5c-.5.2-1.28.2-1.78 0l-1.25-.5A1.25 1.25 0 0 1 4 17v-2.34"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21l1.25.5c.5.2 1.28.2 1.78 0l1.25-.5A1.25 1.25 0 0 0 20 17v-2.34"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          ), 
          title: "Master Badge", 
          description: "Complete all subjects to become a true STEM champion",
          color: "yellow"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <div className="flex h-screen">
        {/* Left Section - Slideshow */}
        <div className="w-1/2 p-8 flex items-center justify-center">
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Slides container */}
            <div className="relative bg-white p-8 sm:p-12 rounded-2xl shadow-lg overflow-hidden min-h-[500px]">
              {/* Slide Content */}
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`slide transition-opacity duration-500 ease-in-out ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full h-full'
                  }`}
                >
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h1>
                  <p className="text-gray-600 mb-8">{slide.content}</p>
                  
                  <div className="space-y-4">
                    {slide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className={`mr-4 text-${feature.color}-500 bg-${feature.color}-100 p-2 rounded-md`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-700">{feature.title}</h3>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute bottom-6 right-8 sm:bottom-10 sm:right-12 flex items-center space-x-3">
              <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition duration-300 ${
                    currentSlide === index ? 'bg-teal-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-black mb-2" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>LAKSHYA</h1>
            <p className="text-xl text-gray-600 font-medium" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Learn. Achieve. Grow.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get Started</h2>
            
            {/* Name input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
              />
            </div>

            {/* Class dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
              >
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            {/* Button */}
            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:scale-105 transform transition shadow-lg"
            >
              Start Learning →
            </button>
            
        {session && (
          <div className="text-center mt-4">
            <p>Welcome, {session.user.name}</p>
            <button
              onClick={() => signOut()}
              className="mt-2 text-blue-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
