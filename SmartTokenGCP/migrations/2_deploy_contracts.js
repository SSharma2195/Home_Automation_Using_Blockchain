const Web3 = require('web3');

const TruffleConfig = require('../truffle-config');

var Migrations = artifacts.require("./SmartToken.sol");


module.exports = async function(deployer, network, addresses) {
//	console.log("1234",TruffleConfig);
//	console.log("5678",TruffleConfig.networks);
  const config = TruffleConfig.networks.development;

 
    const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));

    console.log('>> Unlocking account ' + config.from);
    const ww = await web3.eth.personal.unlockAccount(config.from, "1234", 36000);
    console.log("unlocked:", ww);

  console.log('>> Deploying migration');
  await deployer.deploy(Migrations);
  console.log("Deployed:", deployer.address);
};
