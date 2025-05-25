"use client";

import {
  FlexChild,
  FlexContainer,
} from "@/components/Presentational/Layout/FlexContainer";
import { Input } from "@/components/Presentational/Form/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveUserThunk, setName } from "@/store/slices/sessionUser";
import { Heading } from "@/components/Presentational/Heading";
import { Button } from "@/components/Presentational/Form/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectSessionUser } from "@/store/selectors/sessionuser";

export default function UserInput() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sessionUser = useAppSelector(selectSessionUser);
  useEffect(() => {
    if (sessionUser.id) {
      router.push("/games");
    }
  }, [router, sessionUser.id]);
  return (
    <FlexContainer $flexDirection="column">
      <Heading>Enter username</Heading>
      <FlexChild>
        <FlexContainer $gap="1rem">
          <Input
            value={sessionUser.name || ""}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <Button
            onClick={() =>
              dispatch(saveUserThunk({ name: sessionUser.name || "" }))
            }
          >
            +
          </Button>
        </FlexContainer>
      </FlexChild>
    </FlexContainer>
  );
}
