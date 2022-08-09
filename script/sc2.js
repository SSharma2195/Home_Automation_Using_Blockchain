
// Interaction with GPIO
var Gpio = require('onoff').Gpio;

// Interaction with Ethereum
var Web3 = require('web3');
var web3 = new Web3();

// connect to the local node

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

// The contract that we are going to interact with
var contractAddress = "0xCD10B992fB6E00875DFfc67c1c3BC80c864da17D"

// Define the ABI (Application Binary Interface)
const ABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress);

// components connected to the RPi
var LED = new Gpio(4, 'out'); // single LED output

// display initial state
showStatus();

// wait for an event triggered on the Smart Contract
var onValueChanged = contract.OnValueChanged({ _from: web3.eth.coinbase });

onValueChanged.watch(function (error, event) {
  console.log("event:", event);

  if (!error) {
    showStatus()
  }
});

// showStatus1();
// function showStatus1() {

//   console.log("account:",  web3.eth.coinbase);

// }

// power the LED according the value of the token
function showStatus() {

  // console.log("account:",  web3.eth.coinbase);

  //web3.personal.unlockAccount(web3.eth.accounts[1], ‘blockchain’)
  //web3.eth.defaultAccount = web3.eth.accounts[0]

  // retrieve the value of the token
  var token = contract.getTokens(web3.eth.coinbase);

  // display the LED according the value of the token
  const LED = new Gpio(4, 'out'); // Export GPI04 as an output


  if (token > 1) {
    LED.writeSync(1);
    console.log("LED is turned on");
  }
  else {
    LED.writeSync(0) //single LED
    console.log("LED is turned off")
  }


}

// release process
process.on('SIGINT', function () {
  LED.unexport()
  // button.unexport()

})
