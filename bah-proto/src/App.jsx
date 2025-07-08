import { useState } from "react";
import MapComponent from "../components/mapComponent";

function App() {
  const [selectedPollutant, setSelectedPollutant] = useState("pm25");

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0b0f1a] text-gray-200 font-sans">
      {/* 🔵 Header */}
      <header className="absolute top-0 left-0 w-full bg-[#111827]/90 backdrop-blur-md shadow-md z-50 flex justify-between items-center px-4 py-2 border-b border-[#1f2937]">
        <div className="flex items-center gap-3">
          <img
            src="WhatsApp Image 2025-07-07 at 2.09.14 PM.jpeg"
            alt="Main Header"
            className="h-10 w-auto rounded"
          />
          <h1 className="text-xl font-semibold text-blue-400">AQI INDIA</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
          <button className="text-sm px-4 py-1 rounded border border-blue-500 text-blue-400 hover:bg-blue-950 transition">
            Log In
          </button>
        </div>
      </header>

      {/* 🔴 Sidebar */}
      <div className="absolute top-16 left-0 bg-[#1f2937]/90 backdrop-blur-sm border-r border-[#374151] shadow-md p-4 w-44 z-40 rounded-tr-xl">
        <h2 className="text-md font-bold mb-3 text-blue-300">Pollutants</h2>
        <button
          onClick={() => setSelectedPollutant("pm25")}
          className={`block w-full text-left mb-2 px-3 py-1 rounded text-sm ${
            selectedPollutant === "pm25"
              ? "bg-blue-900/80 text-white"
              : "bg-gray-800/60 hover:bg-gray-700"
          }`}
        >
          PM 2.5
        </button>
        <button
          onClick={() => setSelectedPollutant("pm10")}
          className={`block w-full text-left px-3 py-1 rounded text-sm ${
            selectedPollutant === "pm10"
              ? "bg-blue-900/80 text-white"
              : "bg-gray-800/60 hover:bg-gray-700"
          }`}
        >
          PM 10
        </button>
        <hr className="border-gray-700 my-3" />
        <h2 className="text-lg font-semibold mb-3 text-cyan-400">Tools</h2>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left text-sm hover:text-cyan-300">
              💬 Chatbot
            </button>
          </li>
          <li>
            <button className="w-full text-left text-sm hover:text-cyan-300">
              🌐 Language
            </button>
          </li>
          <li>
            <button className="w-full text-left text-sm hover:text-cyan-300">
              🕐 24h Forecast
            </button>
          </li>
          <li>
            <button className="w-full text-left text-sm hover:text-cyan-300">
              📢 Awareness
            </button>
          </li>
          <li>
            <button className="w-full text-left text-sm hover:text-cyan-300">
              📄 Past PM Data
            </button>
          </li>
        </ul>
      </div>
      <div className="relative h-screen w-screen font-sans bg-[#0F172A] text-white rounded-4xl">
        {/* 🗺️ Map Box */}
        <div className="absolute top-16 left-44 right-4 bottom-4 rounded-4xl shadow-lg border border-[#2d3748] z-10">
          <MapComponent pollutant={selectedPollutant} />
        </div>

        {/* 🔍 Search Bar Above Map */}
        <div className="absolute top-24 left-[calc(44px+50%)] transform -translate-x-1/2 z-50 w-[90%] max-w-[800px]">
          <div className="relative">
            {/* 🔍 Lens Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
                />
              </svg>
            </div>

            {/* 🎙 Mic Icon */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z" />
                <path d="M19 11a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
              </svg>
            </div>

            {/* 🔠 Input */}
            <input
              type="text"
              placeholder="Search city or region..."
              className="w-full px-10 pr-10 py-2 rounded-lg bg-[#1E293B]/70 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
