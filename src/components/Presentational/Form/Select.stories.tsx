// Select.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { useState } from "react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedOptionId: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Define some sample options for all stories
const sampleOptions = [
  { value: "option1", displayText: "Option 1" },
  { value: "option2", displayText: "Option 2" },
  { value: "option3", displayText: "Option 3" },
  { value: "option4", displayText: "Option 4" },
];

// Example with numeric values
export const NumericValues: Story = {
  args: {
    options: [
      { value: 1, displayText: "First Option" },
      { value: 2, displayText: "Second Option" },
      { value: 3, displayText: "Third Option" },
    ],
    selectedOptionId: 1,
  },
};

// Example with many options
export const ManyOptions: Story = {
  args: {
    options: [
      ...sampleOptions,
      { value: "option5", displayText: "Option 5" },
      { value: "option6", displayText: "Option 6" },
      { value: "option7", displayText: "Option 7" },
      { value: "option8", displayText: "Option 8" },
      { value: "option9", displayText: "Option 9" },
      { value: "option10", displayText: "Option 10" },
    ],
    selectedOptionId: "option5",
  },
};

// Example with long option text
export const LongOptionText: Story = {
  args: {
    options: [
      { value: "short", displayText: "Short Option" },
      { value: "medium", displayText: "Medium length option text" },
      {
        value: "long",
        displayText:
          "This is a very long option text that might need special handling in the UI",
      },
    ],
    selectedOptionId: "medium",
  },
};

function DefaultSelectStory() {
  const [selectedOptionId, setSelectedOptionId] = useState<string | number>(
    "option1",
  );
  const changeHandler = action("onChange");
  return (
    <Select
      options={sampleOptions}
      selectedOptionId={selectedOptionId}
      onChange={(optionId) => {
        setSelectedOptionId(optionId);
        changeHandler(optionId);
      }}
    />
  );
}

export const Default: Story = {
  render: () => <DefaultSelectStory />,
};
