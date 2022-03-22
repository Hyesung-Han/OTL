// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./SsafyNFT.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    SsafyNFT public mintSsafyNftAddress;
    address public admin;
    address[] public sales;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * OYT | 2022.03.17 | v1.0
     * @dev sale contract를 생성하고 saleFactory에 CA를 저장
     * startTime, endTime -> front에서 Date.now() 사용 초단위로 변환해서 보내줘야함
     */
    function createSale(
        uint256 itemId, // tokenId
        uint256 minPrice, // 최소 bid
        uint256 purchasePrice, // 즉시구매가
        uint256 startTime, // 판매 시작일
        uint256 endTime, // 판매 종료일
        address currencyAddress, //  주소 ssf 0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333
        address nftAddress // nft contract 주소
    ) public returns (address) {
        mintSsafyNftAddress = SsafyNFT(nftAddress);
        // TODO
        address tokenOwner = mintSsafyNftAddress.ownerOf(itemId);

        // contract 생성전 조건 검사
        require(tokenOwner == msg.sender, "Caller is not NFT token owner.");
        require(minPrice > 0, "Price is zero or lower.");
        require(purchasePrice > 0, "Price is zero or lower.");

        // sale contract 생성
        address saleContract = address(new Sale(admin, tokenOwner, itemId, minPrice, purchasePrice, startTime, endTime, currencyAddress, nftAddress));

        // setApprovalForAll(saleContract, true); // web3에서 호출해야함
        
        sales.push(saleContract);
        
        emit NewSale(saleContract, owner(), (sales.length-1));

        return saleContract;
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {

    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public saleStartTime;
    uint256 public saleEndTime;
    uint256 public minPrice;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event HighestBidIncereased(address bidder, uint256 amount);
    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    )  {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        saleStartTime = startTime;
        saleEndTime = endTime;
        currencyAddress = _currencyAddress; //어떤 화폐인지
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount) public {
        // TODO
    }

    function purchase() public payable onlyAfterStart endcheck{

        // 판매자가 아닌 경우 호출 가능
        buyer = msg.sender;
        require(seller != buyer, "Seller can not buy this NFT");

        // 해당 Sale의 판매 시점이 유효한 경우 구매 가능
        require(block.timestamp < saleEndTime, "NFT Selling is closed");
        
        // 구매 희망자가 Sale 컨트랙트에게 구매 희망자의 ERC-20 토큰을 
        // 송금할 수 있는 권한을 허용한 경우(ERC-20 approve)
        require(erc20Contract.approve(buyer, purchasePrice), "Not Approved");

        //1번 bid
        // TODO

        //2. 구매자의 ERC-20 토큰을 즉시 구매가만큼 판매자에게 송금한다.
        erc20Contract.transferFrom(buyer, seller, purchasePrice);

        //3. NFT 소유권을 구매자에게 이전한다.
        erc721Constract.safeTransferFrom(address(this), buyer, tokenId);

        //4. 컨트랙트의 거래 상태와 구매자 정보를 업데이트 한다.
        _end();
        emit SaleEnded(buyer, purchasePrice);


    }

    function confirmItem() public {
        // TODO 
    }
    
    function cancelSales() public {
        // TODO
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(
            block.timestamp >= saleStartTime,
            "Sale: This sale is not started."
        );
        _;
    }

    modifier endcheck(){
        require(!ended, "This NFT selling is already closed");
        _;
    }
}
