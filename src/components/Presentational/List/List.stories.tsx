import { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { useState } from "react";

const meta: Meta<typeof List> = {
  title: "Presentational/List",
  component: List,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const SelectableList: Story = {
  args: {
    items: [
      { display: "Item 1", key: "1" },
      { display: "Item 2", key: "2" },
      { display: "Item 3", key: "3" },
    ],
    onItemClick: (key, isSelected) =>
      console.log(`Clicked item with key: ${key}, selected: ${isSelected}`),
    areItemsSelectable: true,
  },
};

export const NoClickHandler: Story = {
  args: {
    items: [
      { display: "Item 1", key: "1" },
      { display: "Item 2", key: "2" },
      { display: "Item 3", key: "3" },
    ],
    areItemsSelectable: false,
  },
};

function DefaultListStory() {
  const [selectedNames, setSelectedNamed] = useState<string[]>([]);
  const items = [
    {
      display: "James",
      key: "james",
    },
    {
      display: "Alice",
      key: "alice",
    },
    {
      display: "Bob",
      key: "bob",
    },
    {
      display: "Charli",
      key: "charli",
    },
    {
      display: "David",
      key: "david",
    },
  ];
  return (
    <List
      areItemsSelectable={true}
      items={items.map((i) => ({
        ...i,
        isSelected: selectedNames.includes(i.key),
      }))}
      onItemClick={(id, isSelected) =>
        setSelectedNamed(
          isSelected
            ? [...selectedNames, id]
            : selectedNames.filter((name) => name !== id),
        )
      }
    />
  );
}

export const NonSelectableWithHandler: Story = {
  args: {
    items: [
      { display: "Item 1", key: "1" },
      { display: "Item 2", key: "2" },
      { display: "Item 3", key: "3" },
    ],
    onItemClick: (key, isSelected) =>
      console.log(`Clicked item with key: ${key}, selected: ${isSelected}`),
    areItemsSelectable: false,
  },
};

export const Default: Story = {
  render: () => <DefaultListStory />,
};
