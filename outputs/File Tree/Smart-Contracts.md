```tex
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│  truffle-config.js
│
├─build 		/*빌드시 생성되는 폴더*/
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
│  │  Migrations.sol 	/* 시나리오 테스트 배포 */
│  │  SaleFactory.sol 	/* NFT 거래 관련 API */
│  │  SsafyNFT.sol 	/* NFT 생성 관련 API */
│  │  SsafyToken.sol 	/* 시나리오 테스트 */
│  │
│  ├─access
│  │      Ownable.sol
│  │      README.adoc
│  │
│  ├─token
│  │  ├─ERC20 		/* Solidity 공식 코드 폴더 */
│  │  │  │  ERC20.sol
│  │  │  │  IERC20.sol
│  │  │  │  README.adoc
│  │  │  │
│  │  │  └─extensions
│  │  │          IERC20Metadata.sol
│  │  │
│  │  └─ERC721  	/* NFT 기본 로직 구현 */
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
│      1_initial_migration.js 	/* 시나리오 테스트 deploy */
│
└─test 			/* 시나리오 테스트 구현 */
        NftContractTest.js
        SaleContractTest.js 	
```

