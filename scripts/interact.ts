import dotenv from "dotenv";
import { ethers, providers } from "ethers";
const hre = require("hardhat");

dotenv.config(); // Load environment variables from .env file
const provider = new ethers.providers.JsonRpcProvider();
const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
if (!contractAddress) {
  console.error("Please set your CONTRACT_ADDRESS in the .env file");
  process.exit(1);
}
const RPC_NODE_URL: string = process.env.RPC_NODE_URL || "";

const ContinuousAudits = require("./../artifacts/contracts/AuditTrailandRegulatoryReporting.sol/AuditTrail.json");
const contractABI: any[] = ContinuousAudits.abi;

async function main() {
  const provider = new providers.JsonRpcProvider(RPC_NODE_URL);  
  const signer = await hre.ethers.getSigner("address");
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const createContract = await contract.updateDocumentHash("nik");
    await createContract.wait();
    console.log("product created");
    console.log("The transaction hash is:", createContract.hash);
    const receipt = await createContract.wait();
    console.log("The transaction returned the following transaction receipt:\n", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
