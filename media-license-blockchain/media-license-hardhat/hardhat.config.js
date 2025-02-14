// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_RPC_URL, // Alchemy or Infura API Key
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};