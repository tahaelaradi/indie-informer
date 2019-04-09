import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NavLink from "./navlink";

const NavBar = styled.div`
  overflow: hidden;
  background-color: #1e2638;
  top: 0;
  padding: 16px 24px;
`;

const Title = styled.h1`
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px #3066be;
  float: left;
  margin: 0px;
`;

const ButtonGroup = styled.div`
  float: right;
`;

function Header() {
  return (
    <NavBar>
      <Link to="/">
        <Title>
          <i className="fas fa-gamepad" />&nbsp;Indie~Informer!
        </Title>
      </Link>
      <ButtonGroup>
        <Link to="/search">
          <NavLink title={"Search"} icon={"fa fa-search"} />
        </Link>
        <Link to="/history">
          <NavLink title={"History"} icon={"fas fa-history"} />
        </Link>
        <Link to="/about">
          <NavLink title={"About"} icon={"fas fa-lightbulb"} />
        </Link>
      </ButtonGroup>
    </NavBar>
  );
}

export default Header;
