const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the contract without providing any constructor arguments
  const StudyTracker = await hre.ethers.deployContract("StudyTracker");

  // Wait for the contract to deploy
  await StudyTracker.waitForDeployment();

  // Print the address of the deployed contract
  console.log("StudyTracker Contract Address:", StudyTracker.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds
StudyTracker
  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: StudyTracker.target,
  });
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
