// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MediaLicense is ERC721, Ownable {

    constructor(address _stablecoin) ERC721("MediaLicenseNFT", "MLNFT") Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoin);
    }

    struct MediaAsset {
        string ipfsHash;
        uint256 price;
        address payable creator;
        uint256 royaltyPercentage;
    }

    mapping(uint256 => MediaAsset) public assets;
    uint256 public nextTokenId;
    IERC20 public stablecoin;

    event LicenseIssued(uint256 indexed tokenId, address indexed buyer);
    event RoyaltyPaid(address indexed creator, uint256 amount);



    function registerAsset(string memory ipfsHash, uint256 price, uint256 royaltyPercentage) external {
        require(royaltyPercentage <= 10000, "Invalid royalty percentage");

        uint256 tokenId = nextTokenId++;
        assets[tokenId] = MediaAsset(ipfsHash, price, payable(msg.sender), royaltyPercentage);
        _mint(msg.sender, tokenId);
    }

    function purchaseLicense(uint256 tokenId) external {
        MediaAsset storage asset = assets[tokenId];
        require(asset.creator != address(0), "Invalid asset");

        uint256 royaltyAmount = (asset.price * asset.royaltyPercentage) / 10000;
        uint256 creatorPayment = asset.price - royaltyAmount;

        stablecoin.transferFrom(msg.sender, asset.creator, creatorPayment);
        stablecoin.transferFrom(msg.sender, owner(), royaltyAmount);

        _transfer(asset.creator, msg.sender, tokenId);
        emit LicenseIssued(tokenId, msg.sender);
        emit RoyaltyPaid(asset.creator, royaltyAmount);
    }
}
