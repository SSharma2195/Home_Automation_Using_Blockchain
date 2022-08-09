module.exports = { 
	networks: { 
		development: {
			host: "localhost", 
			port: 8545, 
			network_id: "*",
			from: "0xC4365486455AcC2fb5eFA2C3C6ADDc1f9A211b90",
		
		} 
	},
	compilers: {
   		 solc: {
		      version: "0.6.12"
		 }
 	}
};
