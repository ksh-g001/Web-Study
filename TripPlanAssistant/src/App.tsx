import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function onHandleClick() {
    setCount((pre) => pre + 1);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-400 to-indigo-600">
      <div className="bg-gradient-to-b from-purple-700 to-indigo-700 p-8 rounded-xl shadow-2xl max-w-sm w-full text-center transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-white mb-4">안녕하세요!</h1>
        <p className="text-lg font-medium text-white mb-6">
          Tailwind CSS 예제에 오신 것을 환영합니다.
        </p>
        <button
          className="flex items-center gap-2.5 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => onHandleClick()}
        >
          <FaPlus className="text-xl" />
          <span>Count 증가 {count}</span>
        </button>
      </div>
    </div>
  );
}

export default App;
