// api/hello.js

// Vercel 서버리스 함수의 기본 핸들러 함수
export default function handler(request, response) {
  // HTTP GET 요청이 오면 "Hello from Vercel!" 메시지를 반환합니다.
  response.status(200).json({
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString(),
  });
}
