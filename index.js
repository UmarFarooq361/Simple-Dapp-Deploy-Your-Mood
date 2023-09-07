const MoodContractAddress = "0x998D9B1be1e6501de3cD3d2C0EE7891c41600422";
    const MoodContractABI = [ 
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

    let MoodContract = undefined;
    let signer = undefined;

    async function getMood() {
      if (MoodContract) {
        const mood = await MoodContract.getMood();
        document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
        console.log(mood);
      } else {
        console.error('MoodContract is not initialized');
      }
    }

    async function setMood() {
      if (MoodContract) {
        const mood = document.getElementById("mood").value;
        await MoodContract.setMood(mood);
      } else {
        console.error('MoodContract is not initialized');
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
          MoodContractAddress,
          MoodContractABI,
          signer
        );
      });
    }).catch((error) => {
      console.error('Failed to connect to Metamask:', error);
    });