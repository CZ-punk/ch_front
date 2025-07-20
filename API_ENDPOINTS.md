# API 엔드포인트 명세서

## 서버 사이드 OAuth API

### 1. Google OAuth 시작
- **URL**: `GET /api/auth/google/oauth`
- **설명**: Google OAuth 인증 시작 (서버에서 Google로 리다이렉트)
- **응답**: Google OAuth 페이지로 리다이렉트

### 2. Google OAuth 콜백
- **URL**: `GET /api/auth/google/callback`
- **설명**: Google OAuth 인증 완료 후 콜백 처리
- **쿼리 파라미터**:
  - `code`: Google에서 받은 인증 코드
  - `state`: CSRF 방지를 위한 상태값
- **응답**:
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "사용자 이름",
    "picture": "profile_image_url",
    "provider": "google"
  }
}
```

### 3. Kakao OAuth 시작
- **URL**: `GET /api/auth/kakao/oauth`
- **설명**: Kakao OAuth 인증 시작 (서버에서 Kakao로 리다이렉트)
- **응답**: Kakao OAuth 페이지로 리다이렉트

### 4. Kakao OAuth 콜백
- **URL**: `GET /api/auth/kakao/callback`
- **설명**: Kakao OAuth 인증 완료 후 콜백 처리
- **쿼리 파라미터**:
  - `code`: Kakao에서 받은 인증 코드
  - `state`: CSRF 방지를 위한 상태값
- **응답**:
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "사용자 이름",
    "picture": "profile_image_url",
    "provider": "kakao"
  }
}
```

## 기존 API (토큰 기반)

### 5. Google 로그인 (기존 방식)
- **URL**: `POST /api/auth/google`
- **설명**: Google OAuth 인증 후 JWT 토큰 발급
- **요청 본문**:
```json
{
  "credential": "google_oauth_credential_token"
}
```
- **응답**:
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "사용자 이름",
    "picture": "profile_image_url",
    "provider": "google"
  }
}
```

### 6. Kakao 로그인 (기존 방식)
- **URL**: `POST /api/auth/kakao`
- **설명**: Kakao OAuth 인증 후 JWT 토큰 발급
- **요청 본문**:
```json
{
  "accessToken": "kakao_access_token"
}
```
- **응답**:
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "사용자 이름",
    "picture": "profile_image_url",
    "provider": "kakao"
  }
}
```

### 3. 토큰 리프레시
- **URL**: `POST /api/auth/refresh`
- **설명**: Refresh Token을 사용하여 새로운 Access Token 발급
- **요청 본문**:
```json
{
  "refreshToken": "jwt_refresh_token"
}
```
- **응답**:
```json
{
  "accessToken": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

### 4. 로그아웃
- **URL**: `POST /api/auth/logout`
- **설명**: 사용자 로그아웃 및 토큰 무효화
- **헤더**: `Authorization: Bearer {access_token}`
- **응답**:
```json
{
  "message": "로그아웃되었습니다."
}
```

## 사용자 관련 API

### 1. 사용자 프로필 조회
- **URL**: `GET /api/user/profile`
- **설명**: 현재 로그인한 사용자의 프로필 정보 조회
- **헤더**: `Authorization: Bearer {access_token}`
- **응답**:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "사용자 이름",
  "picture": "profile_image_url",
  "provider": "google|kakao",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 2. 사용자 프로필 수정
- **URL**: `PUT /api/user/profile`
- **설명**: 사용자 프로필 정보 수정
- **헤더**: `Authorization: Bearer {access_token}`
- **요청 본문**:
```json
{
  "name": "새로운 이름",
  "picture": "새로운_프로필_이미지_URL"
}
```
- **응답**:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "새로운 이름",
  "picture": "새로운_프로필_이미지_URL",
  "provider": "google|kakao",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 에러 응답 형식

모든 API에서 에러 발생 시 다음 형식으로 응답:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": "상세 에러 정보 (선택사항)"
  }
}
```

### 주요 에러 코드
- `UNAUTHORIZED`: 인증 실패
- `FORBIDDEN`: 권한 없음
- `NOT_FOUND`: 리소스를 찾을 수 없음
- `VALIDATION_ERROR`: 입력값 검증 실패
- `INTERNAL_SERVER_ERROR`: 서버 내부 오류

## JWT 토큰 구조

### Access Token
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "provider": "google|kakao",
  "iat": 1640995200,
  "exp": 1640998800
}
```

### Refresh Token
```json
{
  "sub": "user_id",
  "type": "refresh",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## CORS 설정

프론트엔드에서 API 호출을 위해 다음 CORS 설정이 필요합니다:

```javascript
// Express.js 예시
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com' 
    : 'http://localhost:3000',
  credentials: true
}));
```

## 환경 변수

서버 측에서 필요한 환경 변수:

```env
# JWT 설정
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# 데이터베이스 설정
DATABASE_URL=your_database_connection_string

# 서버 설정
PORT=8080
NODE_ENV=development
``` 