import { GameSubscription } from "./game";

export class DevGameSubscription extends GameSubscription {
  private readonly token: string;
  constructor(gameId: string, connectionToken: string) {
    super(gameId, connectionToken);
    this.token = connectionToken;
  }

  addMultiplePlayers(playerIds: string[]): void {
    this.webSocket?.send(
      JSON.stringify({
        type: "addMultiplePlayers",
        data: playerIds,
        connectionToken: this.token,
      }),
    );
  }
}
export function getDevGameSubscription(
  gameId: string,
  connectionToken: string,
): DevGameSubscription {
  return new DevGameSubscription(gameId, connectionToken);
}
