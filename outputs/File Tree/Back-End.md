```tex
│  .dockerignore
│  .env  /* key, 포트 등 config 구성*/
│  .gitignore
│  app.js /* router 및 기본 설정*/
│  Dockerfile
│  package-lock.json
│  package.json
│  swagger.js /* swagger 설정*/
│
├─bin
│      www /* express 셋팅 및 포트 지정*/
│
├─config /* DB, S3 설정 파일*/
│      connection.js
│      s3-config.js
│
├─src
│  ├─home /* 미니홈피 api*/
│  │      home.controller.js
│  │      home.repository.js
│  │      home.service.js
│  │
│  ├─items /* 아이템 api*/
│  │      items.controller.js
│  │      items.repository.js
│  │      items.service.js
│  │
│  ├─sales /* 아이템 거래 api*/
│  │      sales.controller.js
│  │      sales.repository.js
│  │      sales.service.js
│  │
│  └─user /* 회원 정보 api*/
│          user.controller.js
│          user.repository.js
│          user.service.js
│
└─swagger /* 기능별 swagger*/
        home.yaml
        items.yaml
        sales.yaml
        user.yaml
```

