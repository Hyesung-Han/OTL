│  .dockerignore
│  .env
│  .gitignore
│  app.js
│  Dockerfile
│  package-lock.json
│  package.json
│  swagger.js
│
├─bin
│      www
│
├─config
│      connection.js
│      s3-config.js
│
├─src
│  ├─home
│  │      home.controller.js
│  │      home.repository.js
│  │      home.service.js
│  │
│  ├─items
│  │      items.controller.js
│  │      items.repository.js
│  │      items.service.js
│  │
│  ├─sales
│  │      sales.controller.js
│  │      sales.repository.js
│  │      sales.service.js
│  │
│  └─user
│          user.controller.js
│          user.repository.js
│          user.service.js
│
└─swagger
        home.yaml
        items.yaml
        sales.yaml
        user.yaml