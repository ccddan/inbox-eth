require("dotenv").config();

const config = {
  blockchain: {
    privateKey: process.env.PRIVATE_KEY,
    rpc: {
      url: process.env.RPC_URL,
    },
  },
};

module.exports = Object.freeze(config);