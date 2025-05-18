"use client";

import { Spacer } from "@/components/presentational/layout/Spacer";
import { GamesPanel } from "@/components/Functional/DevPanel/GamesPanel";
import { ActiveGame } from "@/components/Functional/DevPanel/ActiveGame";
import { FlexContainer } from "@/components/presentational/layout/FlexContainer";

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
