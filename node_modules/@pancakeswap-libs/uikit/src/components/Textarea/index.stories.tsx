import React from "react";
import styled from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import Heading from "../Heading/Heading";
import Textarea from "./Textarea";
import { scales } from "./types";

const Row = styled.div`
  display: flex;
  margin-bottom: 32px;

  & > input + input {
    margin-left: 16px;
  }
`;

export default {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  return (
    <div>
      {Object.keys(scales).map((key) => (
        <>
          <Heading mb="16px">{key}</Heading>
          <Row>
            <Textarea scale={scales[key]} value="Value"/>
            <Textarea scale={scales[key]} value="Value" placeholder="with placeholder"/>
            <Textarea scale={scales[key]} value="Value" isSuccess/>
            <Textarea scale={scales[key]} value="Value" isWarning/>
            <Textarea scale={scales[key]} value="Value" disabled/>
          </Row>
        </>
      ))}
    </div>
  );
};

