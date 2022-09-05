import React from "react";
import styled, { createGlobalStyle } from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function FullHeightPage({ children }: Props) {
  return (
    <>
      <Page>{children}</Page>
      <GlobalFullHeight />
    </>
  );
}

const GlobalFullHeight = createGlobalStyle`
        html ,body{
        height: 100%;
    }
`;

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
