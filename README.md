# 🌝TL 
[[_TOC_]]

## PJT 소개
### 일정/진행 사항
---
  - 시작 날짜 : 2022년 2월 28일 [월]
  - 종료 날짜 : 2022년 4월 08일 [금]
  - 진행 사항

     | | 완료| 예정|
     | ------ | ------ | ------ |
     | Backend| Swagger, DB생성, 작품 API, 로그인 API| CI/CD 자동 배포, 마이룸 API |
     | Frontend| Main/ConnectWallet/SearchResult/RegisterItem/RegisterSale제작. Metamask연동 |MyRoom/DecorateRoom/CreateProfile 페이지 제작. 페이지 API 적용 |
     | Blockchain| NFT SaleFactory/생성자/Purchase 구현 |Bid/Confirm/Cancel 구현 |
     | 기획| 화면정의서, WireFrame, Sequence Diagram, ERD, Rest API 명세서 |UCC 제작, Testcase 제작 |

### 기획 배경
---
- 📍 **타겟 : MZ세대**
  ```
    M세대 : 디지털기기와 아날로그를 모두 섭렵한 밀레니얼 세대
    Z세대 : 비대면 온라인환경에서 인맥을 형성하는데 익숙한 세대
  ```

- **MZ세대의 특징**

  ![image](/uploads/653596fe975d8f7319c39556a8ff0d89/image.png)

  https://www.fneyefocus.com/news/articleView.html?idxno=13933

  1️⃣ **개인의 개성과 취향** : MZ세대는 신흥 소비세력으로 꼽히고 있으며 개인의 개성과 취향을 우선시하고 이를 적극 소비합니다.

  2️⃣ **소셜미디어를 적극 활용** : 유년시절부터 디지털 환경에 노출됐기 대문에 신기술에 민감할 뿐만 아니라 소비활동에도 이를 적극적으로 활용해 소셜미디어를 적극 활용합니다 

  3️⃣ **커스터마이징** : 시중에서 판매하는 무선 이어폰을 자신의 좋아하는 컬러, 캐릭터 등으로 꾸미기도 하고 외식메뉴를 자신의 취향대로 구성합니다.


### 주제
---
 - <h3> OTL : (One can Take Limited item) </h3>

   - 나만 가질 수 있는, 나만의 아이템으로 꾸민 개성있는 미니홈피 서비스입니다.

   - OTL은 MZ 세대의 **니즈를 충족**시키고, 온라인 환경에서 인맥을 형성하는 MZ세대의 **특성을 고려**하여 개발한 **미니홈피 서비스**입니다.

   - OTL에서 **세상에 단 하나뿐인 아이템**을 통해 자신의 개성을 드러낼 수 있는 공간을 마련하고, NFT 거래를 통해 자신의 아이템들을 판매함으로써 수익을 창출할 수 있습니다.

### 주요 기능
---
- 💰 **NFT 거래**

    - 홈페이지에서 자신이 가지고 싶은 **NFT작품을 검색**해 볼 수 있습니다.

    - **작품 상세보기**를 통해 작품의 정보, 거래 히스토리, 판매 가격 등을 알 수 있으며 가격 제안을 하거나 즉시 구매를 통해 **NFT를 구매**할 있습니다.

    - 사용자는 자신이 가지고 있는 NFT를 **판매**등록하여 수익을 얻을 수 있습니다.

- 🎀 **마이홈 꾸미기**

    - **프로필**을 통해 자신의 정보를 보여줄 수 있습니다.

    - 본인이 소유한 NFT를 이용해 **마이홈**을 꾸밀 수 있습니다.

### 팀 소개
---
- 팀명 : 👖 **청바지**! (**청**춘은 **바**로 **지**금)

- 팀원 소개
<img src="/uploads/2857bc646d63a11a1a7642de62763e43/image.png" width="900" height="600"/>

- 팀 페이지 바로가기

  <a href="https://www.notion.so/8fc2391a556b447d9ca4a70cf1fd194a">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" /> 
  </a>

### 기술 스택 및 버전
---
<img src="/uploads/1d8180dc6af760fed7b1497dd0cc32ba/image.png" width="1000" height="500"/>

<img src="https://img.shields.io/badge/REACT-17.0.0-76B900?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/REDUX-4.1.2-76B900?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/MATERIAL UI-5.2.8-76B900?style=for-the-badge&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/Web3-1.6.1-76B900?style=for-the-badge&logo=web3&logoColor=white"/> 

<img src="https://img.shields.io/badge/NODE.JS-16.13.2-93b023?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/SWAGGER-6.1.0-93b023?&style=for-the-badge&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/EXPRESS.JS-4.17.1-93b023?&style=for-the-badge&logo=express&logoColor=white"/>

<img src="https://img.shields.io/badge/BESU-21.10.2-93b023?&style=for-the-badge&logo=besu&logoColor=white"/> <img src="https://img.shields.io/badge/SOLIDITY-0.8.10-93b023?&style=for-the-badge&logo=solidity&logoColor=white"/> <img src="https://img.shields.io/badge/TRUFFLE-5.4.24-93b023?&style=for-the-badge&logo=truffle&logoColor=white"/> <img src="https://img.shields.io/badge/GANACHE-6.12.2-93b023?&style=for-the-badge&logo=ganache&logoColor=white"/>

<img src="https://img.shields.io/badge/MYSQL-8.0.0-93b023?&style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/docker-20.10.12-93b023?&style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/jenkins-2.319.2-93b023?&style=for-the-badge&logo=jenkins&logoColor=white"/> 

<br/>

## PJT 산출물
### 시스템 구성도

---
<img src="/uploads/9011fa1d0dd7b66a5288f2c8655e99e9/image.png" width="1000" height="500"/>

### 화면 정의서

---
- [**`화면정의서`**](outputs/화면정의서.pdf)

### WireFrame

---
- [**`WireFrame 링크`**](https://www.figma.com/file/RGjZpCgeXMgufK09UbDWUh/OTL?node-id=0%3A1)






### Sequence Diagram

---
- [**`Sequence Diagram 폴더`**](outputs/SequenceDiagram)

- [메인기능] Contract 호출 / MyRoom 수정
<img src="/uploads/7edd1721ee490061b1c5d6a5d736344c/image.png" width="1000" height="500"/>

### DB Modeling [ERD]

---
- [**`ERD`**](outputs/ERD.png)

![image](/uploads/6fe57581d3a7c8eb195fad63cbac5eba/image.png)

### Rest API URL (Node.js with Express)

---

- [**`Swagger 링크`**](http://localhost:3000/api/api-docs/)

![Swagger](/uploads/761f72688184a23864805d31147bbcf3/image.png)


