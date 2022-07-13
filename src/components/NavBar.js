import styled from "styled-components";
import icePlanet from "../assets/icePlanet.png";
const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const WalletText = styled.p`
  color: #ffffff;
  margin-right: 20px;
  font-size: 22px;
`;
const ConnectButton = styled.button`
  border-radius: 15px;
  font-size: 26px;
  border: none;
  padding: 10px;
  box-shadow: 5px 5px 20px black;
  margin-right: 20px;
  :hover {
    cursor: pointer;
    background-color: #667799;
  }
`;
const NavBar = ({ wallet, connectWallet }) => {
  return (
    <Container>
      <a href="https://ajmasta.github.io/unitopia/">
        <img
          src={icePlanet}
          style={{ width: "55px", marginLeft: "10px" }}
          alt="Logo"
        />
      </a>
      {!wallet ? (
        <ConnectButton onClick={connectWallet} className="OldSchool">
          Connect Wallet
        </ConnectButton>
      ) : (
        <WalletText className="OldSchool">
          {wallet.slice(0, 5)}...
          {wallet.slice(wallet.length - 5, wallet.length - 1)}
        </WalletText>
      )}
    </Container>
  );
};

export default NavBar;
