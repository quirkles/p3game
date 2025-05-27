import { Meta, StoryObj } from "@storybook/react";
import { CheckBox } from "./CheckBox";

const meta: Meta<typeof CheckBox> = {
  title: "Presentational/Form/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    onChange: {
      action: "changed",
      description: "Callback when the checkbox state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Unchecked: Story = {
  args: {
    isChecked: false,
    onChange: (checked) => console.log(`Checkbox changed to: ${checked}`),
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    onChange: (checked) => console.log(`Checkbox changed to: ${checked}`),
  },
};
