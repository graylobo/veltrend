import styled from "styled-components";
import { ArrowLeft } from "./vectors";

interface Props {
  onClick?: () => void;
}

export default function HeaderBackButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <ArrowLeft />
    </IconButton>
  );
}

const IconButton = styled.div`
  border: none;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`;
