// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./extensions/IERC721Metadata.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/Strings.sol";
import "../../utils/introspection/ERC165.sol";

/**
 * PJT Ⅰ - 과제 1 ERC-721 구현
 * @dev EIP-721을 준수하여 ERC721을 작성합니다.
 * https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard
 */

contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol =토큰의 단위
    string private _symbol;

    // Mapping from token ID to owner address == 토큰 아이디 넣으면 주소 줌
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count == 주소 넣으면 토큰 몇개있는지 알려줌
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address == 토큰 아이디 넣으면 승인된 주소 알려줌
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals == 소유자 주소 넣으면 오퍼레이터의 승인정보 알려줌
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    //특정 주소가 몇 개의 nft 토큰을 보유하는지 반환
    //매개변수는 0 주소 일 수 없음(address(0)) X
    function balanceOf(address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            owner != address(0),
            "ERC721: balance query for the zero address"
        );
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    // 특정 토큰의 소유자 주소 반환
    function ownerOf(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _owners[tokenId] != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    // 토큰 권한을 특정 주소에게 부여한다.
    // NFT 소유자만 권한을 부여할 수 있어야 한다.
    // 권한이 부여되면 Approval 이벤트 발생
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);

        require(to != owner, "ERC721 : appoval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );
        _tokenApprovals[tokenId] = to;

        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(
            _owners[tokenId] != address(0),
            "ERC721: approved query for nonexistent token"
        );
        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    // 토큰의 operator 설정한다
    // operator란 특정 소유자의 토큰을 전송할 수 있는 모든 권한을 가짐
    // 토큰 소유자에 의해서만 권한을 지정할 수 있어야 한다.
    // 함수 호출 시 ApprovalForAll 이벤트 발생
    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        require(operator != msg.sender, "ERC721: approve to caller");

        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        address owner = ownerOf(tokenId);
        address tokenApprovals = getApproved(tokenId);
        require(
            owner == from ||
                isApprovedForAll(owner, from) ||
                tokenApprovals == from,
            "from is NOT the owner of the Token"
        );
        require(to != address(0), "Transfer to address 0x0");

        _clearApproval(tokenId);

        _owners[tokenId] = to;

        _balances[from] -= 1;

        _balances[to] += 1;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    // 1. 송금을 지시할 수 있는 대상은 nft 소유 당사자(ownerOf()), 승인받은 주소, 지정된 관리자 주소이다.
    // 2. tokenId가 유효한 토큰인지 확인할 수 있어야 한다.
    // 3. 받는 주소가 스마트 컨트랙트 주소인 경우 ERC721Receiver 의 onERC721Received 가 구현되어 있는지 검사해야한다.
    // 4. 받는 주소가 0주소가 아닌지 확인한다.

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        transferFrom(from, to, tokenId);
        if (to.isContract()) {
            bytes4 result = IERC721Receiver(to).onERC721Received(
                msg.sender,
                address(0),
                tokenId,
                _data
            );
            require(
                result ==
                    bytes4(
                        keccak256(
                            "onERC721Received(address,address,uint256,bytes)"
                        )
                    ),
                "receipt of token is NOT completed"
            );
        }
    }

    function _clearApproval(uint256 tokenId) private {
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    // 1. 소유 주소는 0 주소가 아니어야 한다.
    // 2. tokenId는 이미 존재해서는 안된다.
    // _balances, _owners 정보 변경, Transfer event 발생
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: transfer to the zero address");
        require(_owners[tokenId] == address(0), "ERC721: token already minted");
        _balances[to] = _balances[to] + 1;

        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        if (to.isContract()) {
            bytes4 result = IERC721Receiver(to).onERC721Received(
                msg.sender,
                address(0),
                tokenId,
                _data
            );
            require(
                result ==
                    bytes4(
                        keccak256(
                            "onERC721Received(address,address,uint256,bytes)"
                        )
                    ),
                "receipt of token is NOT completed"
            );
        }
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */

    //nft 삭제하는 함수
    // 컨트랙트를 상속받은 컨트랙트에 의해서만 호출가능해야 한다.
    // token id를 매개변수로 받는다.
    // 소각할 nft의 위임 송금 정보를 삭제한다.
    // _balances와 _owners 정보 변경
    // 수신자를 0주소로 하는 Transfer event 발생
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        // Clear approvals
        _clearApproval(tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
}
