const fs = require("fs");
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const config = require("../config");
const contractsFolderPath = path.resolve(__dirname, "..", "contracts");
const contractInfo = require(path.resolve(contractsFolderPath, "Inbox.json"));

const provider = new HDWalletProvider(
  config.blockchain.privateKey,
  config.blockchain.rpc.url,
);
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts:", accounts);

  const contract = await new web3.eth
    .Contract(contractInfo.abi)
    .deploy({
      data: contractInfo.bytecode,
      arguments: ["Inbox initial message"],
    })
    .send({
    from: accounts[0],
    gas: '1000000',
  });

  console.log(`Contract ${contractInfo.name} deployed to:`, contract.options.address);

  const contractAddrFilePath = path.resolve(contractsFolderPath, `${contractInfo.name}.addr.json`);
  fs.writeFileSync(
    contractAddrFilePath,
    JSON.stringify({
      name: contractInfo.name,
      addr: contract.options.address
    }, null, 2)
  );
  console.log(`Output file:`, contractAddrFilePath);
})()
  .then(() => console.log("Deployment completed!"))
  .catch(err => console.error(err))
  .finally(() => provider.engine.stop());