import { useSelector } from "react-redux";
import { selectNonPendingGames } from "@/store/selectors/games";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { sortByKey } from "@/utils/array";
import { Heading } from "@/components/Presentational/Heading";

// interface GamesPanelProps {}

export function GamesPanel() {
  const games = useSelector(selectNonPendingGames);
  return (
    <FlexContainer $flexDirection="column">
      <Heading>Games</Heading>
      {sortByKey(games, "name").map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </FlexContainer>
  );
}
