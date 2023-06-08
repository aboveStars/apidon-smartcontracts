//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockSocialV2 is ERC721URIStorage, Ownable {
    uint256 public s_tokenCounter;

    event Minted(address indexed from, uint256 indexed tokenId);

    constructor() ERC721("BlockSocialNFT", "BSN") {
        s_tokenCounter = 0;
    }

    function mint(string memory uri) public onlyOwner {
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, uri);

        emit Minted(msg.sender, s_tokenCounter);

        s_tokenCounter += 1;
    }

    function getTokenCount() public view returns (uint256 tokenCount) {
        tokenCount = s_tokenCounter;
    }
}
