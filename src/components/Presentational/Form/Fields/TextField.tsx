import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { Input } from "@/components/Presentational/Form/input";
import { nanoid } from "nanoid";
import { Span } from "@/components/Presentational/Typography/Span";
import styled from "styled-components";
import { getColor } from "@/styles/colors";

const StyledTextField = styled(FlexContainer)`
  label {
    font-weight: bold;
    text-decoration: underline;
    text-transform: capitalize;
  }
  span {
    color: ${getColor("red")};
  }
`;

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: string;
};

export function TextField<T extends FieldValues>({
  label,
  register,
  required = false,
  error,
}: InputProps<T>) {
  const inputId = nanoid();
  return (
    <StyledTextField $flexDirection="column" $gap="0.5rem">
      <label>{label}:</label>
      <Input
        id={inputId}
        {...register(label, { required })}
        $hasError={!!error}
      />
      {error && <Span>{error}</Span>}
    </StyledTextField>
  );
}
