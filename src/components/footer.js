import React from "react";
import styled from "styled-components";

const Foot = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #1e2638;
  color: white;
  text-align: center;
`;

function Footer() {
  return <Foot>Footer</Foot>;
}

export default Footer;
