# Knowledge Curator - 개인 맞춤형 지식/정보 큐레이터 플랫폼

개인 맞춤형 지식과 정보를 큐레이션하고 관리하는 웹 플랫폼입니다.

## 주요 기능

- 🔐 **사용자 인증**: 로그인/회원가입 기능
- 📚 **콘텐츠 큐레이션**: 맞춤형 콘텐츠 추천 및 관리
- ❤️ **콘텐츠 저장**: 관심 있는 콘텐츠 저장 기능
- 🔍 **검색 기능**: 키워드 기반 콘텐츠 검색
- 🏷️ **카테고리 분류**: 다양한 주제별 콘텐츠 분류
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 기술 스택

- **Frontend**: React.js
- **Styling**: CSS3 (Custom CSS)
- **State Management**: React Hooks
- **Build Tool**: Create React App

## 설치 및 실행

1. 프로젝트 클론
```bash
git clone [repository-url]
cd my-app
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 개발 환경 설정
REACT_APP_API_URL=http://localhost:8080

# Google OAuth 설정
REACT_APP_GOOGLE_CLIENT_ID=808933876438-593dqmnt0mudget3pbr2p2d99d0nk131.apps.googleusercontent.com

# Kakao OAuth 설정
REACT_APP_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key_here
```

4. 개발 서버 실행
```bash
npm start
```

5. 브라우저에서 `http://localhost:3000` 접속

## 환경 설정

### 개발 환경
- API 서버: `http://localhost:8080`
- 프론트엔드: `http://localhost:3000`

### 배포 환경
배포 시 `.env` 파일에서 `REACT_APP_API_URL`을 실제 서버 URL로 변경하세요:

```env
REACT_APP_API_URL=https://your-production-domain.com
```

## 프로젝트 구조

```
src/
├── components/
│   ├── Login.js          # 로그인 컴포넌트
│   ├── Login.css         # 로그인 스타일
│   ├── Dashboard.js      # 메인 대시보드 컴포넌트
│   └── Dashboard.css     # 대시보드 스타일
├── contexts/
│   └── AuthContext.js    # 인증 상태 관리 Context
├── services/
│   └── authService.js    # 인증 관련 API 서비스
├── config/
│   └── api.js           # API 설정 및 엔드포인트
├── hooks/
│   └── useKakaoLogin.js # Kakao 로그인 훅
├── App.js               # 메인 앱 컴포넌트
├── App.css              # 전역 스타일
└── index.js             # 앱 진입점
```

## 컴포넌트 설명

### Login 컴포넌트
- Google 및 Kakao 소셜 로그인 지원
- JWT 토큰 기반 인증
- 로딩 상태 및 에러 처리
- 반응형 디자인

### Dashboard 컴포넌트
- 메인 대시보드 인터페이스
- 사이드바 네비게이션
- 콘텐츠 카드 그리드 레이아웃
- 검색 기능
- 카테고리 필터

### AuthContext
- 전역 인증 상태 관리
- JWT 토큰 자동 갱신
- 사용자 정보 관리
- 로그인/로그아웃 기능

### AuthService
- API 통신 관리
- 토큰 저장 및 관리
- 자동 토큰 리프레시
- 에러 처리

## 스타일 특징

- **모던한 디자인**: 그라데이션과 그림자 효과
- **부드러운 애니메이션**: 호버 효과와 전환 애니메이션
- **직관적인 UI**: 사용자 친화적인 인터페이스
- **반응형 레이아웃**: 모든 디바이스에서 최적화

## 향후 개발 계획

- [ ] 백엔드 API 연동
- [ ] 사용자 프로필 관리
- [ ] 콘텐츠 북마크 기능
- [ ] 알림 시스템
- [ ] 다크 모드 지원
- [ ] PWA 지원

## 라이선스

MIT License

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
