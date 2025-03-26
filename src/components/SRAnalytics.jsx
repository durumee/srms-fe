import React from 'react';

const SRAnalytics = ({ srs }) => {
  const completedSRs = srs.filter(sr => sr.status === '처리완료');
  
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const totalDuration = completedSRs.reduce((acc, sr) => {
    const duration = calculateDuration(sr.requestDateTime, sr.completeDateTime);
    return acc + (duration.days * 1440 + duration.hours * 60 + duration.minutes);
  }, 0);

  const averageMinutes = completedSRs.length > 0 ? totalDuration / completedSRs.length : 0;
  const avgDays = Math.floor(averageMinutes / 1440);
  const avgHours = Math.floor((averageMinutes % 1440) / 60);
  const avgMinutes = Math.floor(averageMinutes % 60);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4">처리 시간 분석</h2>
      <div className="mb-4">
        <p className="text-xl font-semibold">
          평균 처리 시간: {avgDays}일 {avgHours}시간 {avgMinutes}분
        </p>
        <p className="text-sm text-gray-500">(총 {completedSRs.length}건 처리완료)</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl mb-2">개별 처리 내역</h3>
        {completedSRs.map(sr => {
          const duration = calculateDuration(sr.requestDateTime, sr.completeDateTime);
          return (
            <div key={sr.id} className="bg-gray-50 p-4 mb-3 rounded">
              <p className="font-medium">{sr.title}</p>
              <p className="text-sm">요청일: {new Date(sr.requestDateTime).toLocaleString()}</p>
              <p className="text-sm">완료일: {new Date(sr.completeDateTime).toLocaleString()}</p>
              <p className="text-sm text-blue-600">
                소요시간: {duration.days}일 {duration.hours}시간 {duration.minutes}분
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SRAnalytics;
