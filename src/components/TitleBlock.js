import styled from "styled-components";
import tile from "../assets/SpaceBackground.png";
import planet from "../assets/planet2.gif";
import { useState } from "react";
import CardBlock from "./CardBlock";
const Title = styled.p`
  font-size: 60px;
  color: white;
  margin: 0px;
  margin-bottom: 20px;
`;
const Subtitle = styled.p`
  font-size: 36px;
  color: white;
  margin: 0px;
  margin-bottom: 20px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  font-size: 26px;
  border: none;
  box-shadow: 5px 5px 20px black;
  margin-top: 20px;
  :hover {
    cursor: pointer;
    background-color: #6699ff;
  }
`;

const TitleBlock = ({ setStore, setDashboard, store, dashboard }) => {
  const [vanish, setVanish] = useState(false);

  const pressStore = () => {
    setVanish(!vanish);
    setTimeout(() => setStore(!store), 300);
  };
  const pressDashboard = () => {
    setDashboard(!dashboard);
  };
  return (
    <Container>
      <>
        <Title className="OldSchool">Unitopia</Title>
        <Subtitle className="OldSchool">
          Buy a Planet. Develop it. Conquer the Universe.
        </Subtitle>

        <img
          src={planet}
          className={vanish ? "vanish" : ""}
          width={"50%"}
          style={{ maxWidth: "500px" }}
          alt="2d planet"
        />

        <Button onClick={pressStore} className="OldSchool">
          Buy a planet
        </Button>
        <Button onClick={pressDashboard} className="OldSchool">
          Manage your planets
        </Button>
      </>
    </Container>
  );
};

export default TitleBlock;
