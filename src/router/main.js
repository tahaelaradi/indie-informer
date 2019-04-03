import React from "react";
import styled from "styled-components";

const MainTitle = styled.h2`
  margin: auto;
  padding: 16px;
`;

function Main() {
  return (
    <div>
      <MainTitle>Welcome to Indie-Informer</MainTitle>
      <p>
        Indie-Informer is a tool for game developers to forcast sales for their
        potential game, based on many factors, such as genre, themes, etc. Our
        platfrom utilizies sales figuers using SteamSpy API, and powered by the
        technology of Machine Learning!
      </p>
    </div>
  );
}

export default Main;
