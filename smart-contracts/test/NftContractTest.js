// /**
//  * PJT Ⅰ - 과제 3 테스트 코드 작성
//  * @dev NFT mint, transfer, and compare URI
//  */

// const NftCreator = artifacts.require("SsafyNFT");

// // NFT를 주고받을 2개의 주소 존재
// // SsfayNFT 컨트랙트 배포
// // 주소 1이 배포된 컨트랙트의 create 함수를 호출하여 새로운 토큰 생성
// // 주소 1이 주소 2에게 transferFrom 함수를 호출하여 토큰 전송

// contract("NftCreator", (accounts) => {
//   it("NFT mint, transfer, and compare URI", async () => {
//     const instance = await NftCreator.deployed();
//     const Nft = instance;
//     const address1 = accounts[0];
//     const address2 = accounts[1];
//     const nft1 = await Nft.create(address1, "asdf");
//     // console.log("nft1 tokenIds", nft1.tx);
//     // console.log("nft1 owner", nft1.tx);
//     const tokenId = nft1.logs[0].args.tokenId;

//     await Nft.transferFrom(address1, address2, tokenId);

//     // TODO
//     // 다음이 반드시 테스트되어야 합니다.

//     // 1. create 호출 후 주소 1 = 생성된 token의 owner
//     // assert.equal(sender, owner, "NFT Mint Failed");
//     // 2. transferFrom 호출 후 주소2 = token의 owner
//     // assert.equal(receiver, owner, "NFT Transfer Failed.");
//     // 3. 저장한 tokenURI == 해당 tokenId로 조회한 tokenURI 서로 일치
//     // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
//   });
// });
/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {
    // TODO
    // 다음이 반드시 테스트되어야 합니다.
    // assert.equal(sender, owner, "NFT Mint Failed");
    // assert.equal(receiver, owner, "NFT Transfer Failed.");
    // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")

    const instance = await NftCreator.deployed();

    const Nft = instance;
    const sender = accounts[0];
    const receiver = accounts[1];

    const tokenURI = "asdf";
// 1
    const ContractResult = await Nft.create(sender, tokenURI);
    const tokenId = ContractResult.logs[0].args.tokenId;
    console.log(tokenId);

    let owner = await Nft.ownerOf(tokenId);
    assert.equal(sender, owner, "NFT Mint Failed");

    // Nft.approve(address1,tokenId);
    await Nft.transferFrom(sender, receiver, tokenId);
    owner = await Nft.ownerOf(tokenId);
    assert.equal(receiver, owner, "NFT Transfer Failed.");

    const tokenURIFetched = await Nft.tokenURI(tokenId);
    console.log(tokenURIFetched);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");

// 2
    const ContractResult2 = await Nft.create(sender, tokenURI);
    const tokenId2 = ContractResult2.logs[0].args.tokenId;
    console.log(tokenId2);

    let owner2 = await Nft.ownerOf(tokenId2);
    assert.equal(sender, owner2, "NFT Mint Failed");

    // Nft.approve(address1,tokenId);
    await Nft.transferFrom(sender, receiver, tokenId2);
    owner2 = await Nft.ownerOf(tokenId2);
    assert.equal(receiver, owner2, "NFT Transfer Failed.");

    const tokenURIFetched2 = await Nft.tokenURI(tokenId2);
    console.log(tokenURIFetched2);
    assert.equal(tokenURI, tokenURIFetched2, "Wrong Token Id or URI.");


  });
});
