import { useSelector } from "react-redux";
import { selectGames } from "@/store/selectors/games";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { values } from "@/utils/object";
import { sortByKey } from "@/utils/array";
import { Heading } from "@/components/Presentational/Heading";

// interface GamesPanelProps {}

export function GamesPanel() {
  const games = useSelector(selectGames);
  return (
    <FlexContainer $flexDirection="column">
      <Heading>Games</Heading>
      {sortByKey(values(games), "name").map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </FlexContainer>
  );
}
