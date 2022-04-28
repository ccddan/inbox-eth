const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractsFolder = path.resolve(__dirname, "..", "contracts"); // path is relative to this file

// Contracts paths
console.log("Compiling Inbox contract...");
const inboxContractPath = path.resolve(contractsFolder, "Inbox.sol");
console.log("\tInput file:", inboxContractPath);

const inboxContractPathOutput = inboxContractPath.replace(".sol", ".json");
const inboxContractCode = fs.readFileSync(inboxContractPath, "utf8");

const compiled = solc.compile(inboxContractCode, 1); // 1 = number of contracts to compile in the file

fs.writeFileSync(inboxContractPathOutput, JSON.stringify(compiled, null, 2));
console.log("\tOutput file:", inboxContractPathOutput);
