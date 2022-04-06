// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./SsafyNFT.sol";

contract SaleFactory is Ownable {
    SsafyNFT public mintSsafyNftAddress;
    Sale public saleContract;
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
        saleContract = new Sale(admin, tokenOwner, itemId, minPrice, purchasePrice, startTime, endTime, currencyAddress, nftAddress);

        //생성된 세일 컨트랙트를 판매중인 작품이 담겨있는 sales에 추가        
        sales.push(address(saleContract));
        
        //세일 만들었으면 이벤트 발생
        emit NewSale(address(saleContract), owner(), (sales.length-1));

        //세일 컨트랙트 주소 반환
        return address(saleContract);
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }

}

contract Sale {

    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public saleStartTime;//판매 시작 시간
    uint256 public saleEndTime;//판매 종료 시작
    uint256 public minPrice;//판매자가 지정한 bid 최소 값
    uint256 public purchasePrice;//판매자가 지정한 바로 구매 값
    uint256 public tokenId;
    address public currencyAddress;//화폐종류(ex. ETH, SSF etc...)
    address public nftAddress;
    bool public ended;//작품의 판매가 종료되었는지 체크

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

    /**
     * HHS | 2022.03.24 | v1.0
     * @dev 판매중인 NFT에 대하여 다른 사용자가 가격을 제안하는 경우
     */
    function bid(uint256 bid_amount) public payable onlyAfterStart endcheck{
    //onlyAfter Start : 판매 시작 시간보다 더 큰지 판별
    //endcheck : 판매가 종료되었는지 판별(즉시 구매 시 판매 종료를 시키기 때문, 시간 체크하는 함수 아님)
    //제안자는 제안을 철회할 수 없다.

        // 판매자가 아닌 경우 호출 가능
        buyer = msg.sender;
        require(seller != buyer, "Seller can not buy this NFT");

        // 해당 Sale의 판매 시점이 유효한 경우 구매 가능
        require(block.timestamp < saleEndTime, "NFT Selling is closed");
        
        // 구매 희망자가 Sale 컨트랙트에게 구매 희망자의 ERC-20 토큰을 
        // 송금할 수 있는 권한을 허용한 경우(ERC-20 approve)
        require(erc20Contract.approve(buyer, bid_amount), "Not Approved");

        //판매자가 지정한 최저 제안가 이상의 금액 제시
        require(minPrice <= bid_amount, "minPrice is higher than yours");

        //현재 최고 제안가 초과 금액 제시
        require(highestBid < bid_amount, "You should bid more amount");

        //즉시 구매가보다 낮은 금액으로 호출
        require(bid_amount < purchasePrice, "Your bid_amount is higher than purchase_Price");

        //이전에 제안자가 있으면 환불 먼저 진행
        if(highestBid > 0){
            // erc20Contract.transferFrom(address(this), highestBidder, highestBid);
            erc20Contract.transfer(highestBidder, highestBid);
        }
        //새로운 제안자로 정보 갱신, 금액 갱신
        highestBidder = buyer;
        highestBid = bid_amount;

        //새로운 제안자가 세일 컨트랙트에게 해당 가격만큼 송금
        erc20Contract.transferFrom(buyer, address(this), bid_amount);

        //새로운 비드 나온 이벤트 발생
        emit HighestBidIncereased(buyer, bid_amount);

    }
    /**
     * HHS | 2022.03.24 | v1.0
     * @dev 판매중인 NFT에 대하여 즉시 구매를 하는 경우
     */
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
        if(highestBid > 0){
            erc20Contract.transfer(highestBidder, highestBid);
        }

        //2. 구매자의 ERC-20 토큰을 즉시 구매가만큼 판매자에게 송금한다.
        erc20Contract.transferFrom(buyer, seller, purchasePrice);

        //3. NFT 소유권을 구매자에게 이전한다.
        erc721Constract.safeTransferFrom(address(this), buyer, tokenId);

        //4. 컨트랙트의 거래 상태와 구매자 정보를 업데이트 한다.
        _end();
        emit SaleEnded(buyer, purchasePrice);

    }

    /**
     * HHS | 2022.03.24 | v1.0
     * @dev 판매 시간이 종료되었고 && 즉시 구매자가 없을 경우, 최고 입찰자가 NFT 소유권 받음
     */
    function confirmItem() public payable{
        //최고 입찰자가 부르는 함수, bid 걸은 사람이 판매 종료 시간이 되었을 때 확인 버튼을 통해 해당 NFT를 받는다.
        // TODO 
        
        //판매 종료시간이 되면 진행
        require(block.timestamp > saleEndTime, "NFT Selling is not closed");

        //함수를 부른 자가 최고 입찰자가 맞는지 확인
        require(msg.sender == highestBidder, "You are not a highest bidder");

        //세일 컨트랙트가 판매자에게 돈 송금(입찰자는 bid시 세일 컨트랙트에게 돈을 주었음)
        erc20Contract.transfer(seller, highestBid);

        //세일 컨트랙트가 입찰자에게 NFT 권한을 줌
        erc721Constract.safeTransferFrom(address(this), highestBidder, tokenId);

        //NFT 판매 상태를 종료로 바꿔줌 
        _end();

        //판매가 끝난 것을 알리는 이벤트 발생
        emit SaleEnded(highestBidder, highestBid);

    }
    
    /**
     * HHS | 2022.03.24 | v1.0
     * @dev 판매중인 NFT에 대하여 판매를 등록한 자 혹은 모든 권한이 있는 admin이 판매를 취소하는 경우
     */
    function cancelSales() public payable onlyAfterStart{

        // //판매 종료 시간보다 더 이전인 경우만 취소 가능
        // require(block.timestamp < saleEndTime, "You cannot cancel");

        //판매자 혹은 모든 권한을 가진 사람(admin)이 이 판매를 철회하는게 맞는지 확인
        require(msg.sender == admin || msg.sender == seller, "You dont have any permission");
    
        //누군가가 가격제안을 한 상태라면 환불 진행
        if(highestBid > 0){
            erc20Contract.transfer(highestBidder, highestBid);
        }

        //세일 컨트랙트가 가지고 있던 NFT 권한을 다시 판매자에게 돌려줌
        erc721Constract.safeTransferFrom(address(this), seller, tokenId);

        //판매 상태 완료로 해놓고 다른 사람들이 구매 혹은 제안하기 못하게 막기
        _end();

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

    // modifier를 사용하여 함수 동작 조건을 재사용 
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
        //판매가 종료되었는지 확인
        require(!ended, "This NFT selling is already closed");
        _;
    }
}
