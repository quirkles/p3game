import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  GridContainer,
  GridItem,
} from "@/components/Presentational/Layout/Grid";
import { TextField } from "@/components/Presentational/Form/Fields/TextField";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Presentational/Form/button";

const addPlayerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

export function AddPlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addPlayerFormSchema),
  });

  const doSubmit = (data: z.infer<typeof addPlayerFormSchema>) => {
    console.log("Submit Data", data);
  };

  return (
    <FlexContainer>
      <GridContainer $columns={2} $gap="medium">
        <GridItem>
          <TextField
            label="name"
            register={register}
            required
            error={errors.name?.message}
          />
        </GridItem>
        <GridItem>
          <TextField
            label="email"
            register={register}
            required
            error={errors.email?.message}
          />
        </GridItem>
        <Button onClick={handleSubmit(doSubmit)}>Add</Button>
      </GridContainer>
    </FlexContainer>
  );
}
