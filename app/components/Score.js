'use client';

import { useState, useEffect } from 'react';

export default function Score() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await fetch(`/api/progress?userName=${encodeURIComponent(username)}`);
          const data = await response.json();
          if (data && data.progress && data.progress.totalScore) {
            setScore(data.progress.totalScore);
          }
        }
      } catch (error) {
        console.error('Error fetching score:', error);
        // Fallback to localStorage
        const savedScore = localStorage.getItem('totalScore');
        if (savedScore) {
          setScore(parseInt(savedScore, 10));
        }
      }
    };

    const handleScoreUpdate = () => {
      const savedScore = localStorage.getItem('totalScore');
      if (savedScore) {
        setScore(parseInt(savedScore, 10));
      }
    };

    // Fetch from database first
    fetchScore();

    // Listen for score updates
    window.addEventListener('storage', handleScoreUpdate);
    window.addEventListener('local-storage', fetchScore);

    return () => {
      window.removeEventListener('storage', handleScoreUpdate);
      window.removeEventListener('local-storage', fetchScore);
    };
  }, []);

  return (
    <div>
      <span className="font-semibold text-gray-600">Score:</span>
      <span className="ml-2 text-emerald-600">{score}</span>
    </div>
  );
}
