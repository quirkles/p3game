"use client";

import {
  FlexChild,
  FlexContainer,
} from "@/components/Presentational/Layout/FlexContainer";
import { Input } from "@/components/Presentational/Form/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  saveUserThunk,
  selectSessionUser,
  setName,
} from "@/store/slices/sessionUser";
import { Heading } from "@/components/Presentational/Heading";
import { Button } from "@/components/Presentational/Form/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInput() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sessionUser = useAppSelector(selectSessionUser);
  useEffect(() => {
    if (sessionUser.id) {
      router.push("/user/create");
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
            Go!
          </Button>
        </FlexContainer>
      </FlexChild>
    </FlexContainer>
  );
}
