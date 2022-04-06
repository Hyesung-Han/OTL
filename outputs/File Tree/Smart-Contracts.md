```tex
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│  truffle-config.js
│
├─build
│  └─contracts
│          Address.json
│          Context.json
│          ERC165.json
│          ERC20.json
│          ERC721.json
│          IERC165.json
│          IERC20.json
│          IERC20Metadata.json
│          IERC721.json
│          IERC721Metadata.json
│          IERC721Receiver.json
│          Migrations.json
│          Ownable.json
│          SafeMath.json
│          Sale.json
│          SaleFactory.json
│          SsafyNFT.json
│          SsafyToken.json
│          Strings.json
│
├─contracts
│  │  Migrations.sol
│  │  SaleFactory.sol
│  │  SsafyNFT.sol
│  │  SsafyToken.sol
│  │
│  ├─access
│  │      Ownable.sol
│  │      README.adoc
│  │
│  ├─token
│  │  ├─ERC20
│  │  │  │  ERC20.sol
│  │  │  │  IERC20.sol
│  │  │  │  README.adoc
│  │  │  │
│  │  │  └─extensions
│  │  │          IERC20Metadata.sol
│  │  │
│  │  └─ERC721
│  │      │  ERC721.sol
│  │      │  IERC721.sol
│  │      │  IERC721Receiver.sol
│  │      │  README.adoc
│  │      │
│  │      └─extensions
│  │              IERC721Metadata.sol
│  │
│  └─utils
│      │  Address.sol
│      │  Context.sol
│      │  Strings.sol
│      │
│      ├─introspection
│      │      ERC165.sol
│      │      IERC165.sol
│      │
│      └─math
│              SafeMath.sol
│
├─migrations
│      1_initial_migration.js
│
└─test
        NftContractTest.js
        SaleContractTest.js
```

