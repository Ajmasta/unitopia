import styled from "styled-components";
import tile from "../assets/cardBackground.png";
import { useState } from "react";
import { ethers } from "ethers";
import planets from "../planets.json";

export const Card = styled.div`
  height: 500px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  animation: appear 0.3s forwards;
  margin: 10px;
  margin-bottom: 20px;
  background: url(${tile});
  box-shadow: 2px 2px 5px black;
`;
export const CardImageContainer = styled.div`
  height: 250px;
  width: 300px;
  padding-bottom: 10px;
  margin-top: 5px;
  transition: 0.25s ease;
  :hover {
    transform: scale(1.2);
  }
`;
export const PlanetImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
`;
export const DetailsContainer = styled.div`
  height: 100%;
  width: 100%;
`;
export const CharacteristicsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: white;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const CharContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: white;
  width: 140px;
  border: white solid 2px;
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 3px;
  transition: 0.1s ease;
  :hover {
    color: black;
    background-color: white;
    transform: scale(1.1);
  }
`;
export const CharacteristicValue = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const CharacteristicName = styled.p`
  font-size: 12px;
  margin: 0;
`;
export const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  font-size: 26px;
  border: none;
  box-shadow: 5px 5px 20px black;
  margin-top: 20px;
  :hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }
`;
const Title = styled.p`
  font-size: 60px;
  color: white;
  margin: 0px;
  margin-bottom: 20px;
`;
const Subtitle = styled.p`
  font-size: 28px;
  color: white;
  margin: 0px;
  margin-bottom: 20px;
`;
const CardBlock = ({ wallet, connectWallet, getContract, contract }) => {
  const mintCall = async (i) => {
    if (!wallet) await connectWallet();
    if (wallet) {
      console.log(contract, "CONTRACT");
      console.log(wallet);
      const balance = await contract.balanceOf(wallet);
      console.log("balance", balance);
      const mint = await contract.mintPlanet(i, {
        value: ethers.utils.parseEther("0.02"),
      });
    }
  };
  return (
    <>
      <Title className="OldSchool">Buy a Planet</Title>
      <Subtitle className="OldSchool">Price: 0.02Ξ</Subtitle>
      <CardContainer>
        {planets?.map((planet, i) => (
          <Card key={`planet${i}`}>
            <CardImageContainer>
              <PlanetImage src={planet.imageUrl} alt="Gas Giant" />
            </CardImageContainer>
            <DetailsContainer>
              <h3 style={{ color: "white" }}>{planet.name}</h3>
              <CharacteristicsContainer>
                <CharContainer>
                  <CharacteristicValue>
                    {planet.chanceOfLife}%
                  </CharacteristicValue>
                  <CharacteristicName>Chance of Life</CharacteristicName>
                </CharContainer>
                <CharContainer>
                  <CharacteristicValue>
                    {planet.ancientArtifacts}
                  </CharacteristicValue>
                  <CharacteristicName>Ancient Artifacts</CharacteristicName>
                </CharContainer>{" "}
                <CharContainer>
                  <CharacteristicValue>
                    {planet.mainRessource}
                  </CharacteristicValue>
                  <CharacteristicName>Main Ressource</CharacteristicName>
                </CharContainer>{" "}
                <CharContainer>
                  <CharacteristicValue>{planet.ressources}</CharacteristicValue>
                  <CharacteristicName>Ressources</CharacteristicName>
                </CharContainer>{" "}
                <CharContainer>
                  <CharacteristicValue>{planet.size}</CharacteristicValue>
                  <CharacteristicName>Size</CharacteristicName>
                </CharContainer>{" "}
                <CharContainer>
                  <CharacteristicValue>{planet.suns}</CharacteristicValue>
                  <CharacteristicName>Suns</CharacteristicName>
                </CharContainer>
              </CharacteristicsContainer>
              <Button className={"OldSchool"} onClick={() => mintCall(i)}>
                Mint
              </Button>
            </DetailsContainer>
          </Card>
        ))}
      </CardContainer>
    </>
  );
};

export default CardBlock;
