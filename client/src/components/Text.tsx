import { styled } from "styled-components";

import * as React from "react";
import { CSSProperties } from "react";
import { FontStyle } from "./theme";

export type FontType = "largeMedium" | "smallRegular";

const Container = styled.div<{ type: FontType; color?: string }>`
  ${({ type }) => FontStyle[type]};
  color: ${({ color }) => (color ? color : "white")};
`;

const DgText = ({
  type,
  children,
  style,
  color,
}: {
  type: FontType;
  children: React.ReactNode;
  style?: CSSProperties;
  color?: string;
}) => (
  <Container type={type} style={style} color={color}>
    {children}
  </Container>
);

export default DgText;
