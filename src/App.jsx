import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SRList from './components/SRList';
import SRForm from './components/SRForm';
import SRDetail from './components/SRDetail';
import SRAnalytics from './components/SRAnalytics'; // 추가된 임포트

function App() {
  const [srs, setSRs] = useState([]);

  const addSR = (newSR) => {
    setSRs([...srs, { ...newSR, id: Date.now(), status: '대기', assignee: '미정' }]);
  };

  const updateSR = (id, updates) => {
    setSRs(srs.map(sr => sr.id === id ? { ...sr, ...updates } : sr));
  };

  const deleteSR = (id) => { // 추가된 삭제 함수
    setSRs(srs.filter(sr => sr.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">SR 관리 프로그램</span>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">SR 목록</Link>
                <Link to="/add" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">SR 추가</Link>
                {/* 추가된 통계 링크 */}
                <Link to="/analytics" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                  처리 통계
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<SRList srs={srs} />} />
            <Route path="/add" element={<SRForm onSubmit={addSR} />} />
            <Route 
              path="/sr/:id" 
              element={<SRDetail srs={srs} updateSR={updateSR} deleteSR={deleteSR} />} 
            />
            {/* 추가된 통계 라우트 */}
            <Route path="/analytics" element={<SRAnalytics srs={srs} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
