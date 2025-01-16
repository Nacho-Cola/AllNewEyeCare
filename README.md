## 소아 사시 진단을 위한 스마트폰 기반 각막 빛 반사 검사 시스템 구현 및 VR 비전테라피  [[PAPER](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11724447)]

👨‍💻팀: EYE PLUS+

### 수상 경력
- **2023 강릉원주대학교 캡스톤디자인 대상 🥇**
- **2023 전남대학교 창의적종합설계경진대회 동상 🥉**

[![시연 영상](https://img.youtube.com/vi/myyhD2bFFIw/0.jpg)](https://www.youtube.com/watch?v=myyhD2bFFIw)


### 소아사시의 문제점

> 시력이 완성되기전 7세 이전에 발견되어야한다.
> 

> 간혈적 사시의 경우 생활 중 발견이 어렵다.
> 

> 복시, 약시로 인한 영구적 시력 장애를 유발한다.
> 

> 사춘기를 압둔 아이들의 자존감 하락, 대외관계 어려움을 초래한다.
>



EyeCare는 소아 사시의 정도를 모니터링하고 YouTube 링크를 통해 영상을 시청할 수 있는 교육 및 엔터테인먼트 플랫폼입니다.  
각막 빛 반사 검사 알고리즘을 통해 **B2B 아이디어**를 고안하였으며, Unity를 활용한 VR 비전테라피를 스마트폰으로 구현하였습니다.

---

| ![Simulator Screenshot - iPhone 15 Pro](https://github.com/user-attachments/assets/19320158-bc16-405b-a047-48b21f5aef6c) | ![KakaoTalk_Photo_2023-05-01-20-17-02](https://github.com/user-attachments/assets/7c9973a4-064f-4781-ae15-178b172d3890) |
|:--------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------:|
| **Main Screen**                                                                          | **VR View Example**                                                                                 |



## 기술 스택

### 1. **프론트엔드**
- **React Native**
  - iOS 전용 지원
  - `react-native-vision-camera`를 활용한 카메라 기능
  - `react-native-youtube-iframe`를 활용한 YouTube 동영상 플레이어
  - `@azesmway/react-native-unity`를 통한 Unity 뷰 통합
- **State Management**
  - React Hooks를 활용한 상태 관리 (`useState`, `useEffect`, `useRef`)

---

### 2. **백엔드**
- **FastAPI**
  - Python 기반 비동기 웹 프레임워크
  - RESTful API 설계
  - FastAPI의 의존성 주입(`Depends`) 기능을 활용한 데이터베이스 세션 관리
- **데이터베이스**
  - SQLite
    - 경량화된 파일 기반 데이터베이스
    - SQLAlchemy ORM을 사용한 테이블 정의 및 쿼리 수행
- **Authentication**
  - OAuth2 및 JWT(Json Web Token) 기반 인증
  - `jose` 라이브러리를 사용한 JWT 토큰 생성 및 검증
  - 비밀번호 해싱에 `passlib` 사용


---


### 3. **VR 비전테라피**

- **Unity**
  - 3D 게임 및 가상현실 콘텐츠 제작을 위한 엔진
  - VR 비전테라피 구현
  - Unity 프로젝트는 [GitHub Unity Builds](https://github.com/Nacho-Cola/AllNewEyeCare/tree/main/unity/builds/ios)에서 확인 가능
- **React Native Unity Integration**
  - `@azesmway/react-native-unity`를 활용한 Unity와 React Native 통합
  - Unity 콘텐츠를 React Native 앱에서 렌더링 가능

---

### 3. **딥러닝 모델**
- **YOLOv8**
  - `ultralytics` 라이브러리를 활용한 사전 학습된 YOLOv8 모델
  - 객체 탐지 기능 구현

---

### 4. **이미지 처리**
- **OpenCV**
  - 이미지 디코딩 및 처리를 위한 라이브러리
- **Base64**
  - 이미지를 Base64 포맷으로 변환하여 FastAPI 서버로 전송

---

### 5. **기타 라이브러리**
- **JavaScript**
  - `qs`: HTTP 요청에서 URL 인코딩된 데이터를 처리하기 위한 라이브러리
- **Python**
  - `numpy`: 데이터 처리 및 이미지 데이터 변환
  - `imageio`: 이미지 파일 생성 및 `.gif` 저장
- **유틸리티**
  - `uvicorn`: FastAPI 서버 실행
  - `sqlalchemy`: ORM 및 데이터베이스 관리

---

## 아키텍처

1. **React Native 앱 (iOS 전용)**
   - 사용자 인터페이스 및 YOLO 기반 이미지 분석 요청
   - 서버와의 통신: HTTP POST 요청
2. **FastAPI 서버**
   - YOLOv8 모델을 활용한 객체 탐지
   - SQLite 데이터베이스에 탐지 결과 저장
   - RESTful API 엔드포인트 제공
3. **YOLOv8**
   - 서버에서 실행되는 사전 학습된 모델
   - 이미지 입력을 받아 탐지 결과 반환

---

## 주요 기능

- **실시간 객체 탐지**
  - React Native의 카메라를 사용하여 사진 촬영
  - YOLOv8을 통해 탐지 결과 반환
- **사용자 인증**
  - 기본 사용자 계정:
    - **아이디**: `admin`
    - **비밀번호**: `root`
  - JWT 기반 인증 및 권한 관리
- **이미지 관리**
  - SQLite 데이터베이스에 탐지 결과 및 이미지 저장
- **YouTube 동영상 재생**
  - React Native를 통해 동영상 스트리밍 제공
- **Unity 통합**
  - Unity 뷰를 통해 가상현실(VR) 콘텐츠 제공

---

## 설치 및 실행 방법

### 1. **백엔드(FastAPI)**

```bash
# 가상 환경 생성
python -m venv venv
source venv/bin/activate  # Windows는 venv\Scripts\activate

# 필요한 패키지 설치
pip install -r requirements.txt

# 서버 실행
python main.py
```

> **주의:** FastAPI 서버를 실행한 후, **자신의 IPv4 주소**를 React Native 앱의 `const URL`에 설정해야 합니다.

```javascript
const URL = "http://<Your-IPv4-Address>:8000";
```

---

### 2. **프론트엔드(React Native)**

```bash
# 패키지 설치
npm install

# iOS 앱 실행
npx react-native run-ios
```

> **주의:** 본 애플리케이션은 **iOS 전용**으로 설계되었습니다. Android 지원은 포함되지 않습니다.
