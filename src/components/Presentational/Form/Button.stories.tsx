import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Presentational/Form/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["blue", "green", "red", "yellow", "purple"],
      description: "Button color (use either color or variant, not both)",
    },
    variant: {
      control: "select",
      options: ["blue", "green", "red", "yellow", "purple"],
      description: "Button variant (use either color or variant, not both)",
    },
    $size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    color: "blue",
    $size: "medium",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    color: "blue",
    $size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    color: "blue",
    $size: "large",
  },
};

export const Green: Story = {
  args: {
    children: "Green Button",
    color: "green",
    $size: "medium",
  },
};

export const Red: Story = {
  args: {
    children: "Red Button",
    color: "red",
    $size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    color: "blue",
    $size: "medium",
    disabled: true,
  },
};

export const WithVariant: Story = {
  args: {
    children: "Variant Button",
    variant: "purple",
    $size: "medium",
  },
};
