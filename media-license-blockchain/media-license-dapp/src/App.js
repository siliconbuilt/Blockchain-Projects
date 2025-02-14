import React, { useState } from "react";
import useWeb3 from "./hooks/useWeb3";

function App() {
  const { web3, contract, account } = useWeb3();
  const [ipfsHash, setIpfsHash] = useState("");
  const [price, setPrice] = useState("");
  const [royalty, setRoyalty] = useState("");

  const registerAsset = async () => {
    if (!contract) return alert("Contract not loaded.");
    alert("1");
    try {
      alert("2");
      const priceInWei = web3.utils.toWei(price, "ether"); // Convert to Wei
      await contract.methods.registerAsset(ipfsHash, priceInWei, royalty).send({ from: account });
      alert("Asset Registered Successfully!");
    } catch (error) {
      console.error("Error registering asset:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>📜 Media License DApp</h2>
      <p>Connected Wallet: {account}</p>

      <div>
        <input type="text" placeholder="IPFS Hash" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value)} />
        <input type="text" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Royalty (%)" value={royalty} onChange={(e) => setRoyalty(e.target.value)} />
        <button onClick={registerAsset}>Register Asset</button>
      </div>
    </div>
  );
}

export default App;
