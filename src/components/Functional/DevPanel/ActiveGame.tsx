import { useSelector } from "react-redux";
import { selectActiveGame } from "@/store/selectors/games";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { RecordTable } from "@/components/Presentational/Layout/RecordTable";
import { isFetchedStoreGame } from "@/store/types";
import { Heading } from "@/components/Presentational/Heading";

export function ActiveGame() {
  const activeGame = useSelector(selectActiveGame);

  if (!activeGame || !isFetchedStoreGame(activeGame)) return null;

  return (
    <FlexContainer $flexDirection="column" $gap="1rem">
      <Heading $level={2}>Active Game</Heading>
      <RecordTable
        data={{
          ID: activeGame.id,
          Name: activeGame.name,
          Status: activeGame.status,
        }}
      />
    </FlexContainer>
  );
}
