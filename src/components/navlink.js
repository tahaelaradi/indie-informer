import React from "react";
import styled from "styled-components";

const NavLink = ({ title, icon }) => {
  return (
    <Button>
      <i className={icon} />
      &nbsp;
      {title}
    </Button>
  );
};

const Button = styled.div`
  display: block;
  position: relative;
  float: left;
  width: 100px;
  padding: 0;
  margin: 10px 10px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 30px;
  color: #1e2638;
  background: #e8e8e8;
  border-radius: 5px;
  transition: all 0.2s;
  box-shadow: 0px 5px 0px 0px #b7b7b7;

  &:active {
    margin-top: 15px;
    margin-bottom: 5px;
    box-shadow: 0px 0px 0px 0px #b7b7b7;
  }
`;

export default NavLink;
