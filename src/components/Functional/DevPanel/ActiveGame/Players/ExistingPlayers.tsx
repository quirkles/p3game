import { User } from "@/types/User";
import styled from "styled-components";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";

interface ExistingPlayersProps {
  onPlayerClick?: (player: User) => void;
}

const StyledExistingPlayers = styled(FlexContainer)``;

export function ExistingPlayers({ onPlayerClick }: ExistingPlayersProps) {
  return <StyledExistingPlayers>List of players</StyledExistingPlayers>;
}
