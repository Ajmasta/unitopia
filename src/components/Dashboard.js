import { useEffect, useState } from "react";
import styled from "styled-components";
import metadata from "../metadata.json";
import {
  Button,
  Card,
  CardContainer,
  CardImageContainer,
  CharacteristicName,
  CharacteristicsContainer,
  CharacteristicValue,
  CharContainer,
  DetailsContainer,
  PlanetImage,
} from "./CardBlock";
import { Puff } from "react-loading-icons";

const FunctionsContainer = styled.div`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const MainContainer = styled.div`
  min-height: 100vh;
`;
const DashBoard = ({ contract, wallet }) => {
  const [amountOwned, setAmountOwned] = useState(null);
  const [tokensArray, setTokensArray] = useState(null);
  const [managePlanet, setManagePlanet] = useState([]);
  const [addressTo, setAddressTo] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkNFT = async () => {
      console.log(wallet);
      const number = await contract.balanceOf(wallet);
      let array = [];
      for (let i = 0; i < number.toNumber(); i++) {
        let ownedPlanets = await contract.tokenOfOwnerByIndex(wallet, i);
        let url = await contract.tokenURI(ownedPlanets.toNumber());

        ///The following code fetches the data from the server, but our free host is too slow.
        /*let data = await (await fetch(url)).json();
        data = { ...data, id: ownedPlanets.toNumber() };
        array.push(data);*/

        let data = metadata[url.slice(url.length - 1)];
        data = { ...data, id: ownedPlanets.toNumber() };
        array.push(data);
      }

      console.log(number);
      console.log(array);
      setTokensArray(array);
      setAmountOwned(number);
      setLoading(false);
    };

    checkNFT();
  }, [wallet]);
  const planetManager = (i) => {
    if (managePlanet.includes(i)) {
      const newArray = [...managePlanet];
      const index = newArray.indexOf(i);
      newArray.splice(index, 1);
      setManagePlanet(newArray);
    } else {
      const newArray = [...managePlanet, i];
      setManagePlanet(newArray);
    }
  };

  const approveNFT = async (_to, i) => {
    const approve = await contract["approve(address,uint256)"](_to, i);
  };
  const transferFrom = async (_to, i) => {
    console.log(wallet, _to, i);
    const transferFrom = await contract[
      "safeTransferFrom(address,address,uint256)"
    ](wallet, _to, i);
  };
  const burn = async (i) => {
    const burn = await contract["burn(uint256)"](i);
  };

  const actionManager = (id) => {
    console.log(addressTo);
    const actionSliced = action.slice(0, action.length - 1);

    if (actionSliced === "Transfer From") {
      transferFrom(addressTo, id);
    }
    if (actionSliced === "Approve") {
      approveNFT(addressTo, id);
    }
    if (actionSliced === "Burn") {
      burn(id);
    }
  };
  return (
    <MainContainer>
      {wallet ? (
        <>
          {amountOwned ? (
            <p style={{ color: "white" }}>
              You own {amountOwned?.toNumber()}{" "}
              {amountOwned > 1 ? "planets" : "planet"}
            </p>
          ) : (
            <div
              style={{
                height: "100vh",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Puff stroke={"#06bcee"} />
              <p style={{ margin: 0, color: "#06bcee", fontWeight: 700 }}>
                Loading
              </p>
            </div>
          )}
          <CardContainer>
            {tokensArray?.map((planet, i) => (
              <Card key={`planet${i}`}>
                <CardImageContainer>
                  <PlanetImage src={planet.image} />
                </CardImageContainer>
                {!managePlanet.includes(i) ? (
                  <>
                    <DetailsContainer>
                      <h3 style={{ color: "white", marginBottom: "5px" }}>
                        {planet.name}
                      </h3>
                      <p style={{ color: "white", margin: "5px" }}>
                        #{planet.id}
                      </p>
                      <CharacteristicsContainer>
                        {planet.attributes.map((attribute, y) => (
                          <CharContainer key={`attribute${y}`}>
                            <CharacteristicValue>
                              {attribute.value}
                            </CharacteristicValue>
                            <CharacteristicName>
                              {attribute.trait_type}
                            </CharacteristicName>
                          </CharContainer>
                        ))}
                      </CharacteristicsContainer>
                      <Button
                        style={{ fontSize: "16px" }}
                        onClick={() => planetManager(i)}
                      >
                        Manage Planet
                      </Button>
                    </DetailsContainer>
                  </>
                ) : !action.includes(i) ? (
                  <DetailsContainer>
                    <FunctionsContainer>
                      <Button
                        style={{ fontSize: "16px" }}
                        onClick={() => setAction(`Transfer From${i}`)}
                      >
                        Transfer From
                      </Button>
                      <Button
                        style={{ fontSize: "16px" }}
                        onClick={() => setAction(`Approve${i}`)}
                      >
                        Approve
                      </Button>
                      <Button
                        style={{ fontSize: "16px" }}
                        onClick={() => setAction(`Burn${i}`)}
                      >
                        Burn
                      </Button>
                    </FunctionsContainer>
                    <Button
                      style={{ fontSize: "16px" }}
                      onClick={() => planetManager(i)}
                    >
                      Check Planet
                    </Button>
                  </DetailsContainer>
                ) : (
                  <DetailsContainer>
                    <FunctionsContainer>
                      {action.slice(0, action.length - 1) !== "Burn" ? (
                        <input
                          placeholder="Address to interact with"
                          onChange={(e) => setAddressTo(e.target.value)}
                        />
                      ) : (
                        ""
                      )}
                      <Button
                        style={{ fontSize: "16px" }}
                        onClick={() => actionManager(planet.id)}
                      >
                        {action.slice(0, action.length - 1)}
                      </Button>
                    </FunctionsContainer>
                    <Button
                      style={{ fontSize: "16px" }}
                      onClick={() => {
                        planetManager(i);
                        setAction("");
                      }}
                    >
                      Check Planet
                    </Button>
                  </DetailsContainer>
                )}
              </Card>
            ))}
          </CardContainer>
        </>
      ) : (
        <h3 style={{ color: "white" }}>Connect your wallet!</h3>
      )}
    </MainContainer>
  );
};
export default DashBoard;
