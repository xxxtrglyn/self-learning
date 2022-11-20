import styled from "@emotion/styled";
import React from "react";

interface Props {
  lightColor: string;
}

const LightBulb: React.FC<{ lightColor: string }> = ({ lightColor }) => {
  return (
    <Light lightColor={lightColor}>
      <Circle />
    </Light>
  );
};

export default LightBulb;

const Light = styled.div<Props>`
  display: inline-flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: "center";
  margin: 0 auto;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  border-bottom: ${(props) => `5px solid ${props.lightColor}80`};
  &::before {
    content: "";
    display: block;
    background-color: ${(props) => `${props.lightColor}`};
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    transition: background-color 0.1s 0.3s ease-out transform 0.3s ease-out;
    z-index: 2;
  }
  &::after {
    content: "";
    display: block;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 0) 0 50% /
        50% 100%,
      repeating-linear-gradient(0deg, #bbb 0, #bbb 20%, #999 20%, #999 40%) 0
        50% / 50% 100%;
    background-repeat: no-repeat;
    background-size: auto;
    border: 1.2rem solid transparent;
    border-bottom: ${(props) => `2.1rem solid ${props.lightColor}`};
    border-top: 0 solid transparent;
    transform: translateY(40%);
    width: 4rem;
    height: 3.5rem;
    z-index: 1;
  }
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  position: absolute;
  background-color: black;
  top: 48%;
  transform: translateY(-300%);
`;
