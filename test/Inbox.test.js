const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledInboxContract = require("../contracts/Inbox.json");

const web3 = new Web3(ganache.provider());
const initialMessage = "Inbox Initial Message";
let inbox;
let accounts = [];
let contractOwner;

beforeEach(async() => {
  // Get list of account (Ganache)
  accounts = await web3.eth.getAccounts();
  contractOwner = accounts[0];

  // Deploy contract
  inbox = await new web3.eth.Contract(compiledInboxContract.abi)
    .deploy({
      data: compiledInboxContract.bytecode,
      arguments: [initialMessage],
    })
    .send({
      from: contractOwner,
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploys contract", async () => {
    assert.ok(inbox.options.address);
  });

  it("has initial message", async () => {
    assert.equal(await inbox.methods.message().call(), initialMessage);
  });

  it("can change message", async () => {
    const msg = "New message";
    await inbox.methods.setMessage(msg).send({from: contractOwner, gas: '1000000'});
    assert.equal(await inbox.methods.message().call(), msg);
  });
});