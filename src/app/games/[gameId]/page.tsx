"use client";

import { use, useEffect } from "react";
import { useGame } from "@/hooks/useGame";
import { useSelector } from "react-redux";
import { selectGame } from "@/store/selectors/games";
import { Spinner } from "@/components/Presentational/Spinner";
import { FlexContainer } from "@/components/Presentational/layout/FlexContainer";
import {Spacer} from "@/components/Presentational/layout/Spacer";

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);
  const { state, gameSubscription } = useGame(gameId);
  const game = useSelector(selectGame(gameId));
  useEffect(() => {
    if (gameSubscription) {
      const unsub = gameSubscription.on("connected", () => {
        console.log("Connected to game");
      });
      return () => {
        unsub();
      };
    }
  }, [gameSubscription]);

  if (
    !game ||
    game.status === "PENDING" ||
    game.status === "FETCHING" ||
    state === "ESTABLISHING_CONNECTION"
  ) {
    return (
      <FlexContainer
        $alignItems="center"
        $justifyContent="center"
        $gap="1rem"
        $flexDirection="column"
      >
        <Spacer $paddingY="2rem">
          <Spinner />
        </Spacer>
      </FlexContainer>
    );
  }
  return (
    <div className="game-page">
      <h1></h1>
      <h2>State: {state}</h2>
      {/* Add game-specific content here */}
    </div>
  );
}
