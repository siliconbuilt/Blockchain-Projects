const hre = require("hardhat");

async function main() {
  const stablecoinAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // USDC testnet address

  const MediaLicense = await hre.ethers.getContractFactory("MediaLicense");
  const contract = await MediaLicense.deploy(stablecoinAddress);
  
  await contract.deployed();
  console.log(`Deployed MediaLicense at: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
