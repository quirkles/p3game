"use client";

import { useState } from "react";
import {
  FlexChild,
  FlexContainer,
} from "@/components/presentational/layout/FlexContainer";
import { useGames } from "@/hooks/useGames";
import { Input } from "@/components/presentational/form/input";
import { Button } from "@/components/presentational/form/button";

export default function UserInput() {
  const { createdGames, createGame } = useGames();

  const [newGameName, setNewGameName] = useState<string>("");

  return (
    <FlexContainer $flexDirection="column">
      <FlexChild>
        <FlexContainer $gap="1rem">
          <Input
            value={newGameName}
            onChange={(e) => setNewGameName(e.target.value)}
          />
          <Button
            onClick={() => {
              createGame({ name: newGameName }).finally(() => {
                setNewGameName("");
              });
            }}
          >
            Create game
          </Button>
        </FlexContainer>
      </FlexChild>
      {createdGames.length > 0 && (
        <FlexChild>
          Join a game
          {createdGames.map((game) => (
            <FlexChild key={game.id}>{game.name}</FlexChild>
          ))}
        </FlexChild>
      )}
    </FlexContainer>
  );
}
