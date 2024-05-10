## 📰SpartaNews
스파르타 AI 6기 심화 프로젝트

<br/>

## 📝프로젝트 소개
스파르타 뉴스 : 
GeekNews와 같은 레퍼런스를 토대로 뉴스 페이지를 만드는 프로젝트. article 관련 페이지와 account 관련 페이지를 django를 이용하여 만들고자 함.

<br/>

## 🗓️개발 기간
- 2024.05.03 ~ 2024.05.10

<br/>

## 👥멤버 구성
- 이환희(팀장) : 댓글 CRUD 기능, 대댓글 CRUD 기능, README 작성
- 김동환(팀원) : 계정 CRUD 기능, ERD diagram 작성, 프론트엔드 구현
- 김시은(팀원) : 발표자료 및 발표
- 이혜민(팀원) : 게시글 CRUD 기능, README작성, API 작성

## 🖥️개발 환경
- Python : Django, DRF
- JavaScript : React
- DB : SQLite

<br/>

## ✅주요 기능

<br/>

### 1. 계정(account) 관련 기능 - 회원가입, 로그인, 로그아웃, 회원정보수정, 회원 탈퇴

#### 1. 회원가입
  - username, email, password (필수사항) / gender (선택사항)
  - username, email 중복 체크
  - password 암호화 (SHA-256)
#### 2. 로그인
  - DB 값 검증
  - username, password 입력 필요
  - 로그인 성공 시, access, refresh 토큰 발급
#### 3. 로그아웃
  - blacklist 생성을 통해 refresh 토큰 만료
  - 로그인 상태 확인 > refresh 토큰값을 보유하고 있는 것을 통해 이미 로그인 상태라고 인지
#### 4. 회원정보 수정
  - 해당 유저에 한해 회원정보 수정 가능
  - username, email, gender 수정
  - gender는 선택사항이나 "F", "M" 외에는 입력 불가능
#### 5. 회원 탈퇴
  - 로그인 상태에서 비밀번호 입력 시 계정탈퇴 
<br/>

### 2. 기사(article) 관련 기능

#### 1. 뉴스 전체 목록 조회
- 전체 뉴스 목록을 조회
- 게시물의 title 부분 클릭 시 본문 내 url 주소로 이동 / 게시물의 content 부분 클릭 시 뉴스 상세 페이지로 이동
- 생성 일자를 기준 최신순으로 목록 나열
- pagination을 이용하여 5개씩 나타나도록 함
#### 2. 뉴스 새 게시물 등록
- 로그인 상태 필수
- title, content, url 입력 필요 (url은 "http://...@..." 형태로 작성)
- created_at,updated_at은 자동 생성, user_id은 로그인한 유저의 id 값이 자동으로 입력되어 따로 post할 필요 없음
#### 3. 뉴스 상세 페이지 조회
- 게시물 생성 시 작성한 필드 표시
- 추가적으로 댓글 수, 댓글목록, 대댓글 목록, user_id, 좋아요 수 표시
#### 4. 뉴스 수정
- 작성자가 로그인된 상태여야 뉴스 수정 가능
- title, content, url 부분적으로 수정 가능
#### 5. 뉴스 삭제
- 작성자가 로그인된 상태여야 뉴스 삭제 가능
- DB 에서 삭제
#### 6. 뉴스 좋아요 기능
- 로그인된 상태에서 해당 유저가 특정 게시물에 좋아요 한 적이 없다면 좋아요 추가, 좋아요 한 적이 있다면 좋아요 취소
- 한 유저가 특정 게시물에 좋아요는 1번만 가능
#### 7. 댓글 조회, 생성, 수정, 삭제
- 댓글 조회는 로그인 상태가 아니여도 가능
- 댓글 생성, 수정, 삭제는 로그인 상태 필요
- 댓글 생성 시 로그인한 user_id 값은 자동으로 입력되어 따로 post할 필요 없음
#### 8. 대댓글 조회, 생성, 수정, 삭제
- 댓글의 구조를 똑같이 상속받아 사용
- 대댓글 조회는 로그인 상태가 아니여도 가능
- 대댓글 생성, 수정, 삭제는 로그인 상태 필요
- 대댓글 생성 시 로그인한 user_id 값은 자동으로 입력되어 따로 post할 필요 없음

<br/>

### 3. 개발 문서 - README.md , ERD Diagram, RESTful API 설계
-  RESTful API

![spartanews_api](https://github.com/1489ehdghks/spartaNews/assets/157605815/436f35d6-0266-492d-a617-f46887a79969)

[API notion 이동](https://www.notion.so/teamsparta/87bf62f0dad248a0962146b68ebbce7c?v=c8e06e5871e4496e9698ad2dc97c0bc7)

<br/>
<br/>


## 🚀 ERD

![spartaNews_ERD(1)](https://github.com/1489ehdghks/spartaNews/assets/157605815/a96dbc74-2f3e-4b7b-8940-88a8f52c2d8c)

<br/>

## ✅ 댓글, 대댓글 포스트맨 구현

<br/>

- **댓글 CRUD**

<br/>

![빈 문서 1001](https://github.com/1489ehdghks/spartaNews/assets/159985538/99167eff-1c81-4beb-b92f-bfd1892b5b24)

<br/>

- **대댓글 CRUD**

<br/>

![빈 문서 2001](https://github.com/1489ehdghks/spartaNews/assets/159985538/59d182a4-291b-4883-ab03-27e5365adf66)


