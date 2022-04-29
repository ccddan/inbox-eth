const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractsFolder = path.resolve(__dirname, "..", "contracts"); // path is relative to this file

console.log("Getting contracts from folder:", contractsFolder);
const files = fs.readdirSync(contractsFolder).filter((fileName) => fileName.endsWith(".sol"));
console.log("\tTotal contracts:", files.length);

files.forEach((fileName) => {
  console.log("Contract:", fileName);
  const contractName = fileName.replace(".sol", "");
  const contractFullPath = path.resolve(contractsFolder, fileName);

  console.log("\tInput file:", contractFullPath);

  const contractCompiledPathOutput = contractFullPath.replace(".sol", ".compiled.json");
  const contractPathOutput = contractFullPath.replace(".sol", ".json");
  const contractCode = fs.readFileSync(contractFullPath, "utf8");

  const compiled = solc.compile(contractCode, 1); // 1 = number of contracts to compile in the file

  fs.writeFileSync(contractCompiledPathOutput, JSON.stringify(compiled, null, 2));
  fs.writeFileSync(contractPathOutput, JSON.stringify({
    name: contractName,
    bytecode: compiled.contracts[`:${contractName}`].bytecode,
    abi: JSON.parse(compiled.contracts[`:${contractName}`].interface),
  }, null, 2));
  console.log("\tOutput file (compiled):", contractCompiledPathOutput);
  console.log("\tOutput file:", contractPathOutput);
});
