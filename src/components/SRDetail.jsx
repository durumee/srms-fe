import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SRDetail({ srs, updateSR, deleteSR }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const sr = srs.find(sr => sr.id === parseInt(id));
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState(sr ? sr.status : '대기');
    const [comment, setComment] = useState('');

    if (!sr) {
        return <div className="text-center mt-8">SR을 찾을 수 없습니다.</div>;
    }

    const handleAccept = () => {
        if (assignee.trim() === '') {
            alert('담당자를 입력해주세요.');
            return;
        }
        const acceptDateTime = new Date().toISOString();
        updateSR(sr.id, { status: '접수', assignee, acceptDateTime });
        navigate('/');
    };

    const handleDelete = () => {
        if (window.confirm('정말로 이 SR을 삭제하시겠습니까?')) {
            deleteSR(sr.id);
            navigate('/');
        }
    };

    //   const handleStatusChange = () => {
    //     updateSR(sr.id, { status });
    //   };

    // 상태 변경 핸들러 수정
    const handleStatusChange = () => {
        const updates = { status };
        if (status === '처리완료') {
            updates.completeDateTime = new Date().toISOString();
        }
        updateSR(sr.id, updates);
    };
    const handleAddComment = () => {
        if (comment.trim() === '') return;
        const newComment = {
            id: Date.now(),
            text: comment,
            createdAt: new Date().toISOString(),
        };
        updateSR(sr.id, { comments: [...(sr.comments || []), newComment] });
        setComment('');
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">SR 상세 정보</h2>
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">제목:</p>
                <p className="text-gray-700">{sr.title}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">설명:</p>
                <p className="text-gray-700">{sr.description}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">요청자:</p>
                <p className="text-gray-700">{sr.requester}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">요청 일시:</p>
                <p className="text-gray-700">{sr.requestDateTime}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">상태:</p>
                <p className="text-gray-700">
                    <span className={`py-1 px-3 rounded-full text-xs ${sr.status === '대기' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                        {sr.status}
                    </span>
                </p>
            </div>
            {sr.acceptDateTime && (
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold mb-2">접수 일시:</p>
                    <p className="text-gray-700">{sr.acceptDateTime}</p>
                </div>
            )}
            <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">담당자:</p>
                <p className="text-gray-700">{sr.assignee}</p>
            </div>
            {sr.status === '대기' && (
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        placeholder="담당자 이름"
                    />
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-2"
                        onClick={handleAccept}
                    >
                        SR 접수
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        onClick={handleDelete}
                    >
                        SR 삭제
                    </button>
                </div>
            )}
            {sr.status !== '대기' && (
                <div className="mb-4">
                    <select
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="접수">접수</option>
                        <option value="검토">검토</option>
                        <option value="처리중">처리중</option>
                        <option value="처리완료">처리완료</option>
                    </select>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        onClick={handleStatusChange}
                    >
                        상태 변경
                    </button>
                </div>
            )}
            <div className="mb-4">
                <h3 className="text-xl mb-2">코멘트</h3>
                {sr.comments && sr.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-100 p-2 mb-2 rounded">
                        <p>{comment.text}</p>
                        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="코멘트 추가"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={handleAddComment}
                >
                    코멘트 추가
                </button>
            </div>
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/')}
            >
                목록으로 돌아가기
            </button>
        </div>
    );
}

export default SRDetail;
