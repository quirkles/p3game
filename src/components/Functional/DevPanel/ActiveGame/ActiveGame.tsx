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

export function ActiveGame() {
  const activeGame = useSelector(selectActiveGame, shallowEqual);
  const players = useSelector(
    (root: RootState) => selectPlayersByIds(root, activeGame?.players || []),
    shallowEqual,
  );

  if (!activeGame || !isFetchedStoreGame(activeGame)) return null;

  return (
    <FlexContainer $flexDirection="column" $gap="1rem">
      <Heading $level={2}>Active Game</Heading>
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
          <ActiveGamePlayers players={players} />
        </GridItem>
      </GridContainer>
    </FlexContainer>
  );
}
