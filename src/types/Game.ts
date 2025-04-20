export interface Game {
  id: string;
  name: string;
  description?: string;
  status: "CREATED" | "ACTIVE" | "ENDED";
  createdBy: string;
}
