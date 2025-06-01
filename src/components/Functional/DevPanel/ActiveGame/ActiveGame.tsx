import { shallowEqual, useSelector } from "react-redux";
import { selectActiveGame } from "@/store/selectors/games";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { RecordTable } from "@/components/Presentational/Layout/RecordTable";
import { isFetchedStoreGame } from "@/store/types";
import { Heading } from "@/components/Presentational/Heading";
import {
  GridContainer,
  GridItem,
} from "@/components/Presentational/Layout/Grid";
import { selectPlayersByIds } from "@/store/selectors/players";
import { RootState } from "@/store/store";
import { ActiveGamePlayers } from "@/components/Functional/DevPanel/ActiveGame/Players/ActiveGamePlayers";
import { selectSessionUserId } from "@/store/selectors/sessionuser";
import { useDevGameConnection } from "@/hooks/useDevGameConnection";

export function ActiveGame() {
  const activeGame = useSelector(selectActiveGame);
  const players = useSelector(
    (root: RootState) => selectPlayersByIds(root, activeGame?.players || []),
    shallowEqual,
  );
  const sessionUserId = useSelector(selectSessionUserId);

  const { gameConnection, state } = useDevGameConnection(
    sessionUserId,
    activeGame?.id || null,
  );

  if (!activeGame || !isFetchedStoreGame(activeGame) || !sessionUserId) {
    return null;
  }

  const handleAddPlayers = (playerIds: string[]) => {
    gameConnection?.addMultiplePlayers(playerIds);
  };

  return (
    <FlexContainer $flexDirection="column" $gap="1rem">
      <Heading $level={2}>Active Game: {state}</Heading>
      <GridContainer $columns={6} $gap="large">
        <GridItem $xsCol={6} $smCol={2}>
          <RecordTable
            data={{
              ID: activeGame.id,
              Name: activeGame.name,
              Status: activeGame.status,
            }}
          />
        </GridItem>
        <GridItem $xsCol={6} $smCol={4}>
          <ActiveGamePlayers
            players={players}
            onPlayersAdded={handleAddPlayers}
          />
        </GridItem>
      </GridContainer>
    </FlexContainer>
  );
}
