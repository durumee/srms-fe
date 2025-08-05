// api/reqrms.js

function convertKeysToCamelCase(data) {
  if (Array.isArray(data)) {
    return data.map(item => convertKeysToCamelCase(item));
  } else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = convertKeysToCamelCase(value);
      return acc;
    }, {});
  } else {
    return data;
  }
}

function toCamelCase(s) {
  return s.replace(/(_\w)/g, match => match[1].toUpperCase());
}

// 모델 정보를 기반으로 테스트 데이터를 생성하는 함수
function createTestData() {
  return [
    // 1단계: 최상위 요구사항
    {
      REQRM_ID: 100,
      UPPER_REQRM_ID: null,
      REQRM_NM: '사용자 관리',
      REQRM_DC: '서비스 이용을 위한 회원 기능 전반을 관리한다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 200,
      UPPER_REQRM_ID: null,
      REQRM_NM: '상품 관리',
      REQRM_DC: '서비스에서 제공하는 상품 정보를 관리한다.',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 300,
      UPPER_REQRM_ID: null,
      REQRM_NM: '결제 시스템',
      REQRM_DC: '상품 구매에 필요한 결제 기능을 제공한다.',
      SORT_ORDR: 3,
      DEL_AT: 'N',
    },

    // 2단계: '사용자 관리'(100) 하위 요구사항
    {
      REQRM_ID: 101,
      UPPER_REQRM_ID: 100,
      REQRM_NM: '회원가입',
      REQRM_DC: '새로운 사용자가 서비스에 가입하는 기능',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 102,
      UPPER_REQRM_ID: 100,
      REQRM_NM: '로그인',
      REQRM_DC: '기존 사용자가 인증을 거쳐 서비스에 접속하는 기능',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 103,
      UPPER_REQRM_ID: 100,
      REQRM_NM: '회원 정보 수정',
      REQRM_DC: '사용자가 자신의 정보를 수정하는 기능',
      SORT_ORDR: 3,
      DEL_AT: 'Y', // 삭제된 기능 예시
    },

    // 3단계: '회원가입'(101) 하위 요구사항
    {
      REQRM_ID: 1011,
      UPPER_REQRM_ID: 101,
      REQRM_NM: '필수 정보 입력',
      REQRM_DC: '이름, 이메일, 비밀번호 등 필수 정보를 입력받는다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 1012,
      UPPER_REQRM_ID: 101,
      REQRM_NM: '유효성 검증',
      REQRM_DC: '입력된 정보의 유효성을 검증한다.',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 1013,
      UPPER_REQRM_ID: 101,
      REQRM_NM: '가입 완료 메일 발송',
      REQRM_DC: '가입 완료 후 확인 메일을 발송한다.',
      SORT_ORDR: 3,
      DEL_AT: 'N',
    },

    // 3단계: '로그인'(102) 하위 요구사항
    {
      REQRM_ID: 1021,
      UPPER_REQRM_ID: 102,
      REQRM_NM: 'ID/PW 로그인',
      REQRM_DC: '아이디와 비밀번호로 로그인한다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 1022,
      UPPER_REQRM_ID: 102,
      REQRM_NM: '소셜 로그인',
      REQRM_DC: 'SNS 계정을 통해 로그인한다.',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 1023,
      UPPER_REQRM_ID: 102,
      REQRM_NM: '자동 로그인',
      REQRM_DC: '사용자가 자동 로그인을 선택할 수 있다.',
      SORT_ORDR: 3,
      DEL_AT: 'N',
    },

    // 2단계: '상품 관리'(200) 하위 요구사항
    {
      REQRM_ID: 201,
      UPPER_REQRM_ID: 200,
      REQRM_NM: '상품 목록 조회',
      REQRM_DC: '등록된 상품 목록을 조회한다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 202,
      UPPER_REQRM_ID: 200,
      REQRM_NM: '상품 상세 조회',
      REQRM_DC: '특정 상품의 상세 정보를 조회한다.',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 203,
      UPPER_REQRM_ID: 200,
      REQRM_NM: '상품 등록/수정',
      REQRM_DC: '관리자가 새로운 상품을 등록하거나 기존 상품을 수정한다.',
      SORT_ORDR: 3,
      DEL_AT: 'N',
    },

    // 3단계: '상품 목록 조회'(201) 하위 요구사항
    {
      REQRM_ID: 2011,
      UPPER_REQRM_ID: 201,
      REQRM_NM: '필터링 기능',
      REQRM_DC: '상품 카테고리, 가격 등으로 필터링할 수 있다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },

    // 2단계: '결제 시스템'(300) 하위 요구사항
    {
      REQRM_ID: 301,
      UPPER_REQRM_ID: 300,
      REQRM_NM: '주문서 작성',
      REQRM_DC: '구매할 상품과 정보를 확인하고 주문서를 작성한다.',
      SORT_ORDR: 1,
      DEL_AT: 'N',
    },
    {
      REQRM_ID: 302,
      UPPER_REQRM_ID: 300,
      REQRM_NM: '결제 수단 선택',
      REQRM_DC: '카드, 계좌이체 등 다양한 결제 수단을 제공한다.',
      SORT_ORDR: 2,
      DEL_AT: 'N',
    },
  ];
}


// 서버리스 함수 핸들러
// req: HTTP 요청 객체, res: HTTP 응답 객체
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // GET 요청만 허용하도록 분기 처리
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // 테스트 데이터 생성
  const testData = createTestData();

  // JSON 형태로 응답 반환
  // 상태 코드 200 (OK)와 함께 데이터를 전송
  res.status(200).json(convertKeysToCamelCase(testData));
}
