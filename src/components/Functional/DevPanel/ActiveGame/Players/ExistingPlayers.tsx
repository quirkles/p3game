import { User } from "@/types/User";
import styled from "styled-components";
import {
  FlexChild,
  FlexContainer,
} from "@/components/Presentational/Layout/FlexContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField } from "@/components/Presentational/Form/Fields/TextField";
import { useEffect } from "react";
import { usePlayersFirestore } from "@/hooks/usePlayersFirestore";
import { List } from "@/components/Presentational/List/List";
import { P } from "@/components/Presentational/Typography/P";

interface ExistingPlayersProps {
  onPlayerClick?: (player: User) => void;
}

const StyledExistingPlayers = styled(FlexContainer)`
  width: 100%;
`;

export function ExistingPlayers({ onPlayerClick }: ExistingPlayersProps) {
  const { players, setQuery } = usePlayersFirestore();

  const { register, watch } = useForm({
    resolver: zodResolver(
      z.object({
        query: z.string(),
      }),
    ),
  });
  const query = watch("query");

  useEffect(() => {
    setQuery(query);
  }, [query, setQuery]);
  return (
    <StyledExistingPlayers $flexDirection="column" $gap="1rem">
      <FlexChild>
        <TextField label="query" register={register} />
      </FlexChild>
      <FlexChild>
        {players.length > 0 ? (
          <List
            onClick={(key) => {
              const player = players.find((p) => p.id === key);
              if (player && onPlayerClick) {
                onPlayerClick(player);
              }
            }}
            items={players.map((p) => ({
              display: p.name,
              key: p.id,
            }))}
          />
        ) : (
          <P>{query?.length ? "No Players Found." : "Search for players."}</P>
        )}
      </FlexChild>
    </StyledExistingPlayers>
  );
}
