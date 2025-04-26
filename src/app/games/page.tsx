"use client";

import { useState } from "react";
import {
  FlexChild,
  FlexContainer,
} from "@/components/presentational/layout/FlexContainer";
import { useGames } from "@/hooks/useGames";
import { Input } from "@/components/presentational/form/input";
import { Button } from "@/components/presentational/form/button";
import Link from "next/link";
import { Heading } from "@/components/presentational/Heading";
import { useRouter } from "next/navigation";

export default function UserInput() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { createdGames, createGame } = useGames();

  const [newGameName, setNewGameName] = useState<string>("");

  return (
    <FlexContainer $flexDirection="column" $gap="1rem">
      {isCreating ? (
        <p>Creating Game.</p>
      ) : (
        <>
          <FlexChild>
            <FlexContainer $gap="1rem">
              <Input
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
              />
              <Button
                onClick={async () => {
                  setIsCreating(true);
                  const { id } = await createGame({ name: newGameName });
                  router.push(`/games/${id}`);
                }}
              >
                Create game
              </Button>
            </FlexContainer>
          </FlexChild>
          {createdGames.length > 0 && (
            <FlexChild>
              <Heading>Join an existing game</Heading>
              {createdGames.map((game) => (
                <FlexChild key={game.id}>
                  <Link href={`/games/${game.id}`}>{game.name}</Link>
                </FlexChild>
              ))}
            </FlexChild>
          )}
        </>
      )}
    </FlexContainer>
  );
}
