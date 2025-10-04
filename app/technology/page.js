'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function TechnologyHome() {
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
            <p className="text-gray-600 mt-1">Class {selectedClass || '6'} • Technology</p>
            <div className="mt-3">
              <button onClick={() => router.push('/dashboard')} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition">Back to Dashboard</button>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💻 Technology Fundamentals</h2>
            
            {/* Computer Hardware */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">🖥️ Computer Hardware</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">CPU - Central Processing Unit</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    The CPU is the "brain" of the computer. It processes and executes instructions, 
                    performs calculations, and manages all computer operations.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Function:</strong> Think of it as the conductor of an orchestra
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Input & Output Devices</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Input devices:</strong> Mouse, keyboard, microphone (send data to computer)<br/>
                    <strong>Output devices:</strong> Monitor, printer, speakers (display results)
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> Mouse (input) → Computer → Monitor (output)
                  </div>
                </div>
              </div>
            </div>

            {/* Software & Programs */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">📱 Software & Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Software vs Hardware</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Hardware:</strong> Physical parts you can touch (CPU, monitor, keyboard)<br/>
                    <strong>Software:</strong> Programs and instructions that tell hardware what to do
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Analogy:</strong> Hardware is like a car, software is like the driver
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Application Software</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Application software helps users perform specific tasks. Examples include 
                    Google Docs for writing, games for entertainment, and web browsers for internet.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Word processors, games, photo editors
                  </div>
                </div>
              </div>
            </div>

            {/* Internet & Networking */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">🌐 Internet & Networking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">URL - Website Addresses</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    URL (Uniform Resource Locator) is the address of a website. It tells your 
                    browser where to find a specific webpage on the internet.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> https://www.google.com
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Computer Networks</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>LAN:</strong> Local Area Network - covers small areas like school or office<br/>
                    <strong>WAN:</strong> Wide Area Network - covers large areas like cities or countries
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>LAN Example:</strong> All computers in your school connected together
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Safety & Citizenship */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">🛡️ Digital Safety & Citizenship</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Internet Risks</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Cyberbullying:</strong> Using technology to harass or hurt others<br/>
                    <strong>Privacy risks:</strong> Sharing personal information online<br/>
                    <strong>Malware:</strong> Harmful software that can damage computers
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Stay safe:</strong> Don't share personal info, be kind online
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Digital Citizenship</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Digital citizenship means using technology responsibly and ethically. 
                    It includes being respectful, protecting privacy, and using technology for good.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Key principles:</strong> Respect, responsibility, safety
                  </div>
                </div>
              </div>
            </div>

            {/* Data Storage & IP Addresses */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">💾 Data Storage & Internet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Hard Drive Storage</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A hard drive stores data long-term on your computer. It keeps your files, 
                    programs, and operating system even when the computer is turned off.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Types:</strong> HDD (traditional), SSD (faster, newer)
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">IP Addresses</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    IP (Internet Protocol) addresses are unique numbers that identify devices 
                    on the internet. They're like home addresses for computers and websites.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> 192.168.1.1 (like a digital postal code)
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
              <button onClick={() => router.push('/technology/quiz')} className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">💻 Quiz 1</div>
                <div className="text-sm text-white/90 mt-1">Hardware, software, internet, safety</div>
              </button>
              <button onClick={() => router.push('/technology/quiz2')} className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-6 rounded-lg text-left hover:scale-105 transform transition">
                <div className="text-2xl">🧩 Quiz 2</div>
                <div className="text-sm text-white/90 mt-1">Advanced technology concepts</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


