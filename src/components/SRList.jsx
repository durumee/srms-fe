import React from 'react';
import { Link } from 'react-router-dom';

function SRList({ srs }) {
  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">번호</th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">제목</th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">요청자</th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">요청일시</th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">상태</th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">담당자</th>
          </tr>
        </thead>
        <tbody>
          {srs.map((sr, index) => (
            <tr key={sr.id} className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">{index + 1}</td>
              <td className="py-4 px-6 border-b border-grey-light">
                <Link to={`/sr/${sr.id}`} className="text-blue-500 hover:text-blue-800">{sr.title}</Link>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">{sr.requester}</td>
              <td className="py-4 px-6 border-b border-grey-light">{sr.requestDateTime}</td>
              <td className="py-4 px-6 border-b border-grey-light">
                <span className={`py-1 px-3 rounded-full text-xs ${sr.status === '대기' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                  {sr.status}
                </span>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">{sr.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SRList;
