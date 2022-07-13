import { useEffect, useState } from "react";
import "./App.css";
import TitleBlock from "./components/TitleBlock";
import { ethers } from "ethers";
import NavBar from "./components/NavBar";
import CardBlock from "./components/CardBlock";
import { contractAbi, contractAddress } from "./utils/contractInfo";
function App() {
  const [store, setStore] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProvider = async () => {
      try {
        const providerObject = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signerObject = providerObject.getSigner();
        const contractObject = new ethers.Contract(
          contractAddress,
          contractAbi,
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
          "dashboard"
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
