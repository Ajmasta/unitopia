import { useEffect, useState } from "react";
import "./App.css";
import TitleBlock from "./components/TitleBlock";
import { ethers } from "ethers";
import NavBar from "./components/NavBar";
import CardBlock from "./components/CardBlock";
import { contractAddress } from "./utils/contractInfo";
import contractJson from "./utils/contract.json";
import DashBoard from "./components/Dashboard";
function App() {
  const [store, setStore] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [badNetwork, setBadNetwork] = useState(false);

  useEffect(() => {
    // The "any" network will allow spontaneous network changes
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (newNetwork.chainId === 3) {
        setBadNetwork(false);
      }
      if (oldNetwork) {
        window.location.reload();
      }
    });
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "4") {
        setBadNetwork(true);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProvider = async () => {
      try {
        const providerObject = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signerObject = providerObject.getSigner();
        const contractObject = new ethers.Contract(
          contractAddress,
          contractJson.abi,
          signerObject
        );

        setProvider(providerObject);
        setSigner(signerObject);
        setContract(contractObject);
      } catch (err) {}
      setLoading(false);
    };
    getProvider();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      console.log("test");
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);
    } else {
      alert("Please install metamask!");
    }
  };

  return (
    <div style={loading ? { visibility: "hidden" } : { visibility: "visible" }}>
      <div className="App">
        <NavBar wallet={wallet} connectWallet={connectWallet} />
        {!provider ? (
          <h3 style={{ color: "red" }}>You need metamask to use this app!</h3>
        ) : (
          ""
        )}
        {badNetwork && (
          <h3 style={{ color: "red" }}>Please switch to the Ropsten testnet</h3>
        )}
        {!store && !dashboard ? (
          <TitleBlock
            store={store}
            dashboard={dashboard}
            setStore={setStore}
            setDashboard={setDashboard}
          />
        ) : store ? (
          <CardBlock
            wallet={wallet}
            connectWallet={connectWallet}
            contract={contract}
          />
        ) : dashboard ? (
          <DashBoard wallet={wallet} contract={contract} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
