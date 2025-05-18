import { useSelector } from "react-redux";
import { selectActiveGame } from "@/store/selectors/games";
import { FlexContainer } from "@/components/presentational/layout/FlexContainer";
import { Heading } from "@/components/presentational/Heading";

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
