import { useSelector } from "react-redux";
import { selectActiveGame } from "@/store/selectors/games";
import { FlexContainer } from "@/components/Presentational/layout/FlexContainer";
import { Heading } from "@/components/Presentational/Heading";

export function ActiveGame() {
  const activeGame = useSelector(selectActiveGame);

  if (!activeGame) return null;

  return (
    <FlexContainer $flexDirection="column">
      <Heading>ActiveGame</Heading>
      <pre>{JSON.stringify(activeGame, null, 2)}</pre>
    </FlexContainer>
  );
}
