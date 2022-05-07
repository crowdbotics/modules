// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
// @ts-ignore
import Web3 from "web3";

export let globalConnector;

export const currencyData = [
  {
    chainId: 97,
    title: "Binance"
  },
  {
    chainId: 3,
    title: "Ropsten"
  },
  {
    chainId: 43113,
    title: "Avalanche"
  },
  {
    chainId: 4,
    title: "Rinkeby"
  },
  {
    chainId: 42,
    title: "Kovan"
  },
  {
    chainId: 5,
    title: "Goerli"
  }
];

export const setGlobalConnector = (connector) => {
  globalConnector = connector;
};

export const parseAddress = (input) => {
  const network = input.split(":")[0];
  const addressAndChainId = input.split(":")[1];
  const chainId = addressAndChainId.split("@")[1];
  const address = addressAndChainId.split("@")[0];
  return {
    network,
    address,
    chainId
  };
};

export const walletProvider = () => {
  return new WalletConnectProvider({
    rpc: {
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      43113: "https://api.avax-test.network/ext/bc/C/rpc",
      3: "https://ropsten.infura.io/v3/9ba7553f08b34a0f850ba9ce848ab465",
      4: "https://rinkeby.infura.io/v3/9ba7553f08b34a0f850ba9ce848ab465",
      42: "https://kovan.infura.io/v3/9ba7553f08b34a0f850ba9ce848ab465",
      5: "https://goerli.infura.io/v3/9ba7553f08b34a0f850ba9ce848ab465"

    },
    chainId: globalConnector._chainId,
    connector: globalConnector,
    qrcode: false
  });
};

export const fundTransfer = (provider, sender, receiver, amount) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    await provider.enable();
    // const ethers_provider = await new providers.Web3Provider(provider);
    // const signer = ethers_provider.getSigner();
    const web = new Web3(provider);
    const tx = {
      from: sender,
      to: receiver,
      gas: 250000,
      value: web.utils.toWei(amount)
    };
    web.eth.sendTransaction(tx, (error, transactionHash) => {
      if (error) {
        reject(error);
      } else {
        resolve({ hash: transactionHash });
      }
    });
  });
};

export const switchMetamask = async (chainId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      await globalConnector.sendCustomRequest({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }]
      });
      resolve({ message: "switch currency" });
    } catch (e) {
      resolve(e);
    }
  });
};

export const getBalance = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const provider = walletProvider();
    await provider.enable();
    const web = new Web3(provider);
    web.eth.getAccounts((err, res) => {
      if (err) {
        reject(err);
      }
      web.eth.getBalance(res[0], async (error, amount) => {
        if (error) {
          reject(error);
        } else {
          resolve(await web.utils.fromWei(amount, "ether"));
        }
      });
    });
  });
};
