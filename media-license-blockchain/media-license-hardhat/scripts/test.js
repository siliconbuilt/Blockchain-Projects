const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xfDb10E9DF130C14E233F0839e8fC4673072B3F99";
  const [owner, buyer] = await ethers.getSigners();
  const stablecoin = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // USDC

  const contract = await ethers.getContractAt("MediaLicense", contractAddress);

  console.log("Registering Asset...");
  const tx1 = await contract.registerAsset("ipfs://Qm12345", ethers.utils.parseEther("1"), 1000);
  await tx1.wait();

  console.log("Approving USDC...");
  const usdcContract = await ethers.getContractAt("IERC20", stablecoin);
  await usdcContract.connect(buyer).approve(contractAddress, ethers.utils.parseEther("1"));

  console.log("Purchasing License...");
  const tx2 = await contract.connect(buyer).purchaseLicense(0);
  await tx2.wait();

  console.log("Transaction successful!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
