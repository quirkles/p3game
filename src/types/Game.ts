import { z } from "zod";

const GameStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
  CANCELLED: "CANCELLED",
} as const;

export type TGameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export const gameSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(Object.values(GameStatus) as [TGameStatus, ...TGameStatus[]]),
  createdBy: z.string(),
});

export type Game = z.infer<typeof gameSchema>;
