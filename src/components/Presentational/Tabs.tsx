import { ReactNode, useEffect, useState } from "react";
import { FlexChild, FlexContainer } from "./Layout/FlexContainer";
import styled from "styled-components";
import { getColor } from "@/styles/colors";

interface ITab {
  tabId: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: [ITab, ...ITab[]];
  onTabChange?: (tabId: string) => void;
}

const StyledTabs = styled(FlexContainer)`
  .tabs {
    cursor: pointer;
    > * {
      padding: 0 1rem;
    }
    .inactive {
      border-bottom: 2px solid ${getColor("grey3")};
    }
    .active {
      border-bottom: 2px solid ${getColor("orange")};
    }
  }
`;

export function Tabs({ tabs, onTabChange }: TabsProps) {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].tabId);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(selectedTabId);
    }
  }, [selectedTabId, onTabChange]);

  return (
    <StyledTabs $gap="1rem" $flexDirection="column">
      <FlexChild>
        <FlexContainer className="tabs">
          {tabs.map((t) => (
            <FlexChild
              key={t.tabId}
              className={selectedTabId === t.tabId ? "active" : "inactive"}
              onClick={() => setSelectedTabId(t.tabId)}
            >
              {t.label}
            </FlexChild>
          ))}
        </FlexContainer>
      </FlexChild>
      <FlexChild>
        {tabs.find(({ tabId }) => tabId === selectedTabId)?.content || null}
      </FlexChild>
    </StyledTabs>
  );
}
