import { Heading } from "@/components/Presentational/Heading";
import { FlexContainer } from "@/components/Presentational/Layout/FlexContainer";
import { Button } from "@/components/Presentational/Form/button";
import { List } from "@/components/Presentational/List/List";
import { StorePlayer } from "@/store/slices/players";
import { Modal } from "@/components/Presentational/Modal/Modal";
import { useState } from "react";
import { AddPlayerForm } from "@/components/Functional/DevPanel/ActiveGame/Players/AddPlayerForm";
import { Tabs } from "@/components/Presentational/Tabs";
import { ExistingPlayers } from "@/components/Functional/DevPanel/ActiveGame/Players/ExistingPlayers";

interface ActiveGamePlayersProps {
  players: StorePlayer[];
  onPlayersAdded: (playerIds: string[]) => void;
}

export function ActiveGamePlayers({
  players,
  onPlayersAdded,
}: ActiveGamePlayersProps) {
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
        <Tabs
          tabs={[
            {
              tabId: "createForm",
              label: "Create New Player",
              content: <AddPlayerForm />,
            },
            {
              tabId: "existing",
              label: "Add Existing Player",
              content: (
                <ExistingPlayers
                  handleAdd={(players) => {
                    onPlayersAdded(players.map((p) => p.id));
                  }}
                />
              ),
            },
          ]}
        />
      </Modal>
    </FlexContainer>
  );
}
