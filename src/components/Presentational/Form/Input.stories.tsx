import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Presentational/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $hasError: {
      control: "boolean",
      description: "Indicates if the input has an error",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter text here",
    $hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text here",
    value: "Sample input value",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
  },
};
