```tex
│  .env
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│
├─public
│  │  index.html
│  │  manifest.json
│  │
│  ├─favicon
│  │      favicon.ico
│  │
│  └─static
│      └─img
│           ...이미지 파일...
│
└─src
    │  App.js
    │  index.js
    │  routes.js
    │
    ├─common    # Web3 설정
    │      ABI.js
    │      web3Client.js
    │
    ├─components
    │  │  HorizonLine.js    # divider
    │  │  Page.js           # page 구성
    │  │
    │  ├─@material-extend
    │  │      index.js
    │  │      MHidden.js
    │  │
    │  ├─animate
    │  │  │  index.js
    │  │  │  MotionContainer.js
    │  │  │
    │  │  └─variants
    │  │      │  index.js
    │  │      │  Wrap.js
    │  │      │
    │  │      └─bounce
    │  │              BounceIn.js
    │  │              BounceOut.js
    │  │              index.js
    │  │
    │  ├─category   # 카테고리 목록
    │  │      Category.js
    │  │
    │  ├─items      # 상세보기 페이지 구성 (설명, 히스토리, 카드, 리스트)
    │  │      Description.js
    │  │      ItemHistory.js
    │  │      ItemsCard.js
    │  │      ItemsList.js
    │  │
    │  ├─myhome     # 내홈페이지 구성 (2D Canvas, 작품, 작품리스트, 프로필, 홈페이지)
    │  │      Canvas.js
    │  │      ItemsCard.js
    │  │      MyItemList.js
    │  │      MyProfile.js
    │  │      MyRoom.js
    │  │
    │  ├─profile    # 프로필 구성 (프로필, 프로필 리스트)
    │  │      ProfileCard.js
    │  │      ProfileList.js
    │  │
    │  └─userhome   # 타인홈페이지 구성 (작품, 작품리스트, 프로필, 홈페이지)
    │          ItemsCard.js
    │          UserItemList.js
    │          UserProfile.js
    │          UserRoom.js
    │
    ├─context           # 프로젝트 전체에서 공유하여 사용하는 문구 저장
    │      CommonContext.js
    │
    ├─fullpageLayouts   # 메인페이지 레이아웃 [풀페이지]
    │  │  index.js
    │  │
    │  └─header
    │          DashboardNavbar.js
    │
    ├─image
    │      ...이미지 파일...
    │
    ├─layouts   # 헤더, 푸터 레이아웃
    │  │  index.js
    │  │
    │  ├─footer
    │  │      Footer.js
    │  │
    │  └─header
    │          DashboardNavbar.js
    │
    ├─lib       # MetaMask Connector 설정
    │      Connectors.js
    │
    ├─pages     # 페이지
    │      AboutUs.js           # 팀소개
    │      ConnectWallet.js     # MetaMask 지갑 연동
    │      CreateProfile.js     # 프로필 생성
    │      ItemDetail.js        # 작품 상세보기
    │      Items.js             # 작품 리스트
    │      Main.js              # 메인
    │      MyHome.js            # 나의 홈페이지
    │      Page404.js           # 404 오류
    │      Policy.js            # OTL 정책
    │      RegisterItem.js      # 작품/NFT 등록
    │      RegisterSale.js      # NFT 판매
    │      SearchResult.js      # 작품 검색 리스트
    │      UserHome.js          # 타인의 홈페이지
    │
    ├─redux     # store 설정
    │  │  configStore.js
    │  │
    │  └─reducers
    │          SearchReducer.js # 검색 문구 저장
    │          UserReducer.js   # 로그인 시 회원정보 저장
    │
    ├─theme     # CSS 테마 설정
    │  │  breakpoints.js
    │  │  globalStyles.js
    │  │  index.js
    │  │  main_css.css
    │  │  palette.js
    │  │  shadows.js
    │  │  shape.js
    │  │  typography.js
    │  │
    │  ├─font   # 폰트 설정
    │  │      Broadway-Regular.eot
    │  │      Broadway-Regular.ttf
    │  │      font.css
    │  │
    │  └─overrides  # 효과 설정
    │          Autocomplete.js
    │          Backdrop.js
    │          Button.js
    │          Card.js
    │          IconButton.js
    │          index.js
    │          Input.js
    │          Lists.js
    │          Paper.js
    │          Typography.js
    │
    └─utils     # 숫자 형식 설정
            NumberFormatter.js
```

