import styled from "styled-components";
import { getColor } from "@/styles/colors";

const ErrorItem = styled.li`
  color: ${getColor("red")};
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
`;

type ErrorListProps = {
  errors?: string[];
};

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors?.length) return null;

  return (
    <ErrorContainer>
      {errors.map((error, index) => (
        <ErrorItem key={index}>{error}</ErrorItem>
      ))}
    </ErrorContainer>
  );
}
