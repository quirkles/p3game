"use client";

import { Spacer } from "@/components/Presentational/Layout/Spacer";
import { GamesPanel } from "@/components/Functional/DevPanel/GamesPanel";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { ActiveGame } from "@/components/Functional/DevPanel/ActiveGame/ActiveGame";

export function DevPanel() {
  return (
    <Spacer>
      <FlexContainer $flexDirection="column" $gap="1rem">
        <GamesPanel />
        <ActiveGame />
      </FlexContainer>
    </Spacer>
  );
}
