import { Heading } from "@/components/Presentational/Heading";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { Button } from "@/components/Presentational/Form/button";
import { List } from "@/components/Presentational/List/List";
import { StorePlayer } from "@/store/slices/players";
import { Modal } from "@/components/Presentational/Modal/Modal";
import { useState } from "react";

interface ActiveGamePlayersProps {
  players: StorePlayer[];
}

export function ActiveGamePlayers({ players }: ActiveGamePlayersProps) {
  const [isShowingAddPlayerModal, setIsShowingAddPlayerModal] = useState(false);
  return (
    <FlexContainer $flexDirection="column">
      <Heading $level={3}>
        <FlexContainer $alignItems="center" $gap="1rem">
          Players
          <Button
            onClick={() => setIsShowingAddPlayerModal(true)}
            $size="small"
          >
            +
          </Button>
        </FlexContainer>
      </Heading>
      <List
        items={players.map((player) => ({
          display: "name" in player ? player.name : "Fetching...",
          key: player.id,
        }))}
      />
      <Modal
        isShowing={isShowingAddPlayerModal}
        title="Add Player"
        handleClose={() => setIsShowingAddPlayerModal(false)}
      >
        add the player here
      </Modal>
    </FlexContainer>
  );
}
