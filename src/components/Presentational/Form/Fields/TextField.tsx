import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
};

export function TextField<T extends FieldValues>({
  label,
  register,
  required,
}: InputProps<T>) {
  return (
    <FlexContainer $flexDirection="column">
      <label>{label}</label>
      <input {...register(label, { required })} />
    </FlexContainer>
  );
}
