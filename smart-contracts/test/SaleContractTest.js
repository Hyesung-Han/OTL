/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");

let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
    const mintAmount = 10000;
    const uri = "testURI";
    
    async function print(title) {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2];
        console.log(`\n--------------------  ${title} --------------------`);
        console.log(`Seller: ${seller} ${await ssafyTokenContract.getBalance(seller)}`);
        console.log(`Bidder1: ${bidder1} ${await ssafyTokenContract.getBalance(bidder1)}`);
        console.log(`Bidder2: ${bidder2} ${await ssafyTokenContract.getBalance(bidder2)}\n`);
    }

    async function _fnsleep(delay) {
         var start = new Date().getTime();
          while (new Date().getTime() < start + delay); 
    }

    before(async () =>{
        ssafyTokenContract = await SsafyToken.deployed();
        nftContract = await SsafyNFT.deployed();
        salesFactoryContract = await SaleFactory.deployed();
    })
 
    it("Bid and confirm", async () => {

        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2];

        await ssafyTokenContract.mint(mintAmount);
        
        await ssafyTokenContract.forceToTransfer(seller, bidder1, 1000);
        await ssafyTokenContract.forceToTransfer(seller, bidder2, 1000);
        
        // TODO
        let ContractResult = await nftContract.create(seller, uri);
        let tokenId = ContractResult.logs[0].args.tokenId;

        salesContract = await salesFactoryContract
            .createSale(tokenId, 10, 100, Math.floor(Date.now()/1000), Math.floor(Date.now()/1000)+10, ssafyTokenContract.address, nftContract.address);
        
        const saleAddress = await Sale.at(salesContract.logs[0].args._saleContract);
       
        await nftContract.setApprovalForAll(saleAddress.address, true, {from: seller});
        await nftContract.transferFrom(seller, saleAddress.address, tokenId);

        await ssafyTokenContract.approve(saleAddress.address, 15, {from: bidder1});
        await saleAddress.bid(15, { from: bidder1});

        await ssafyTokenContract.approve(saleAddress.address, 20, {from: bidder2});
        await saleAddress.bid(20, { from: bidder2});

        _fnsleep(mintAmount);

        await saleAddress.confirmItem({ from: bidder2});

        // 다음을 테스트를 통과해야합니다.
       assert.equal(bidder2, await nftContract.ownerOf(tokenId), "Confirm Failed");
       assert.equal(1000, await ssafyTokenContract.getBalance(bidder1), "Refund Failed");

    //    print("시나리오 1");
        console.log(`\n-------------------- 시나리오1 --------------------`);
        console.log(`contract: ${seller} ${await ssafyTokenContract.getBalance(seller)}`);
        console.log(`contract: ${bidder1} ${await ssafyTokenContract.getBalance(bidder1)}`);
        console.log(`contract: ${bidder2} ${await ssafyTokenContract.getBalance(bidder2)}`);


    });

    it("Bid and Purchase", async () => {

        const seller = accounts[0];
        const bidder = accounts[1];
        const purchaser = accounts[3];

        // await ssafyTokenContract.mint(mintAmount);
        
        // await ssafyTokenContract.forceToTransfer(seller, bidder, 1000);
        await ssafyTokenContract.forceToTransfer(seller, purchaser, 1000);

        let ContractResult = await nftContract.create(seller, uri);
        let tokenId = ContractResult.logs[0].args.tokenId;

        salesContract = await salesFactoryContract
            .createSale(tokenId, 10, 100, Math.floor(Date.now()/1000), Math.floor(Date.now()/1000)+10, ssafyTokenContract.address, nftContract.address);
        
        const saleAddress = await Sale.at(salesContract.logs[0].args._saleContract);
       
        await nftContract.setApprovalForAll(saleAddress.address, true, {from: seller});
        await nftContract.transferFrom(seller, saleAddress.address, tokenId);

        await ssafyTokenContract.approve(saleAddress.address, 15, {from: bidder});
        await saleAddress.bid(15, { from: bidder});

        await ssafyTokenContract.approve(saleAddress.address, 100, {from: purchaser});
        await saleAddress.purchase({ from: purchaser});        

        // TODO
        // 다음을 테스트를 통과해야합니다.
        assert.equal(purchaser, await nftContract.ownerOf(tokenId), "Not Owned By Purchaser");
        assert.equal(1000, await ssafyTokenContract.getBalance(bidder), "Refund Failed");
        assert.equal(900, await ssafyTokenContract.getBalance(purchaser), "Transfer Failed");

        console.log(`\n-------------------- 시나리오2 --------------------`);
        console.log(`contract: ${seller} ${await ssafyTokenContract.getBalance(seller)}`);
        console.log(`contract: ${bidder} ${await ssafyTokenContract.getBalance(bidder)}`);
        console.log(`contract: ${purchaser} ${await ssafyTokenContract.getBalance(purchaser)}`);
    });

    it("Bid and Cancel", async () => {
        
        const seller = accounts[0];
        const bidder = accounts[1];
        
        // TODO
        // await ssafyTokenContract.mint(mintAmount);
        
        // await ssafyTokenContract.forceToTransfer(seller, bidder, 1000);

        let ContractResult = await nftContract.create(seller, uri);
        let tokenId = ContractResult.logs[0].args.tokenId;

        const  salesContract = await salesFactoryContract
            .createSale(tokenId, 10, 100, Math.floor(Date.now()/1000), Math.floor(Date.now()/1000)+10, ssafyTokenContract.address, nftContract.address);
        
        const saleAddress = await Sale.at(salesContract.logs[0].args._saleContract);
       
        await nftContract.setApprovalForAll(saleAddress.address, true, {from: seller});
        await nftContract.transferFrom(seller, saleAddress.address, tokenId);

        await ssafyTokenContract.approve(saleAddress.address, 15, {from: bidder});
        await saleAddress.bid(15, { from: bidder});

        await saleAddress.cancelSales({ from: seller});             


        // 다음을 테스트를 통과해야합니다.
        assert.equal(seller, await nftContract.ownerOf(tokenId), "Cancellation Failed");
        assert.equal(1000, await ssafyTokenContract.getBalance(bidder), "Refund Failed");

        console.log(`\n-------------------- 시나리오3 --------------------`);
        console.log(`contract: ${seller} ${await ssafyTokenContract.getBalance(seller)}`);
        console.log(`contract: ${bidder} ${await ssafyTokenContract.getBalance(bidder)}`);
    });

});
