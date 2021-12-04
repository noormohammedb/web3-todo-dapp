App = {
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
  },

  loadWeb3: async () => {
    // Modern dapp browsers...

    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("MetaMask Not Connected");
    }

    if (window.ethereum) {
      console.log("User Have Eth Wallet");
      window.web3 = new Web3(ethereum);
      // console.log(web3);
      try {
        // Request account access if needed
        // console.log(ethereum);
        // console.log(web3);
        const ethAddress = await ethereum.enable();
        // console.log(ethAddress);
        // console.log("get accounts");
        ethereum.send("eth_requestAccounts").then(addArr => console.info("Address Array", addArr.result));
        // web3.eth.getAccounts().then(console.log)
        // const ethRequest = ethereum.request("eth_requestAccounts")
        // console.log(ethRequest);
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */ });
      } catch (error) {
        // User denied account access...
        console.error(error);
        console.log("user denied metamask access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      // web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },
  loadAccount: async () => {
    App.Account = web3.eth.accounts[0];
    console.info("Account Address: ", App.Account);
  },
  loadContract: async () => {
    const todoList = await $.getJSON("TodoList.json");
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    App.todoList = await App.contracts.TodoList.deployed();

    console.info("Contract Address: ", App.todoList.address);
    // console.log(App.todoList);
  },
};

$(window).on("load", () => {
  App.load();
});
