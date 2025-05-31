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
import { useEffect, useState } from "react";
import { usePlayersFirestore } from "@/hooks/usePlayersFirestore";
import { List } from "@/components/Presentational/List/List";
import { P } from "@/components/Presentational/Typography/P";
import { Button } from "@/components/Presentational/Form/button";
import { noop } from "@/utils/func";

interface ExistingPlayersProps {
  handleAdd?: (players: User[]) => void;
}

const StyledExistingPlayers = styled(FlexContainer)`
  width: 100%;
`;

export function ExistingPlayers({ handleAdd = noop }: ExistingPlayersProps) {
  const { players, setQuery } = usePlayersFirestore();

  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const { register, watch, setValue } = useForm({
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

  const onAddPlayerClick = () => {
    handleAdd(
      selectedPlayerIds.reduce((selectedPlayers: User[], pid) => {
        const player = players.find((p) => p.id === pid);
        if (player) {
          selectedPlayers.push(player);
        }
        return selectedPlayers;
      }, []),
    );
    setValue("query", "");
  };
  return (
    <StyledExistingPlayers $flexDirection="column" $gap="1rem">
      <FlexChild>
        <TextField label="query" register={register} />
      </FlexChild>
      <FlexChild>
        {players.length > 0 ? (
          <List
            areItemsSelectable={true}
            onItemClick={(playerId, isSelected) => {
              setSelectedPlayerIds(
                isSelected
                  ? [...selectedPlayerIds, playerId]
                  : selectedPlayerIds.filter((id) => id !== playerId),
              );
            }}
            items={players.map((p) => ({
              display: p.name,
              key: p.id,
              isSelected: selectedPlayerIds.includes(p.id),
            }))}
          />
        ) : (
          <P>{query?.length ? "No Players Found." : "Search for players."}</P>
        )}
      </FlexChild>
      <FlexChild>
        <Button
          disabled={selectedPlayerIds.length === 0}
          $variant="success"
          onClick={onAddPlayerClick}
        >
          Add +
        </Button>
      </FlexChild>
    </StyledExistingPlayers>
  );
}
