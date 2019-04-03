import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NavLink from "./navlink";

const NavBar = styled.div`
  overflow: hidden;
  background-color: #1e2638;
  position: fixed;
  top: 0;
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px #3066be;
  float: left;
  padding: 16px 32px;
`;

const ButtonGroup = styled.div`
  float: right;
  display: flex;
  text-align: center;
  vertical-align: text-bottom;
  padding: 14px 16px;
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
          <NavLink title={"About"} icon={"fas fa-info-circle"} />
        </Link>
      </ButtonGroup>
    </NavBar>
  );
}

export default Header;
