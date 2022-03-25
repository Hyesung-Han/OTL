// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {
    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("name", "symbol") {}

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURIs[tokenId];
    }

    // 해당 함수를 호출함으로써 호출자가 지정한 tokenURI을 새롭게 발행한다.
    // 내부적으로 새로운 토큰 식별자를 부여받고 _mint()를 호출한다.
    // 상태 변수에 토큰 식별자의 tokenURI 정보를 추가한다.
    // 새롭게 생성된 토큰 식별자를 반환한다.
    function create(address to, string memory _tokenURI)
        public
        returns (uint256)
    {
        _tokenIds += 1;
        _mint(to, _tokenIds);

        tokenURIs[_tokenIds] = _tokenURI;

        return _tokenIds;
    }
}
