import { EventEmitter, type EventHandlerMap } from "@/utils/EventEmitter";

interface GameEvents extends EventHandlerMap {
  connected: () => void;
}

const EventTypes: {
  [G in keyof GameEvents]: G;
} = {
  connected: "connected",
} as const;

type GameEvent = keyof GameEvents;

const isEventType = (event: unknown): event is GameEvent => {
  return typeof event === "string" && event in EventTypes;
};

export class GameSubscription extends EventEmitter<GameEvents> {
  private webSocket: WebSocket;

  constructor(gameId: string, connectionToken: string) {
    super();
    this.webSocket = new WebSocket(
      `ws://localhost:8080/ws?gameId=${gameId}&connectionToken=${connectionToken}`,
    );
    this.webSocket.addEventListener("open", () => {
      this.emit("connected");
    });
    this.webSocket.addEventListener(
      "message",
      <T extends GameEvent>(event: MessageEvent) => {
        let parsed: { type: T; data: Parameters<GameEvents[T]> } | null = null;
        try {
          parsed = JSON.parse(event.data);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
        if (parsed && isEventType(parsed.type)) {
          console.log("parsed message", parsed);
          this.emit(parsed.type, ...parsed.data);
        } else {
          console.log("Invalid message received:", event.data);
        }
      },
    );
  }

  unsubscribe(): void {
    this.webSocket.close();
  }
}
export function getGameSubscription(
  gameId: string,
  connectionToken: string,
): GameSubscription {
  return new GameSubscription(gameId, connectionToken);
}
