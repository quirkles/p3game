import { EventEmitter, type EventHandlerArgsMap } from "@/utils/EventEmitter";

interface GameEvents extends EventHandlerArgsMap {
  connected: [];
  disconnected: [];
}

const EventTypes = {
  connected: "connected",
  disconnected: "disconnected",
} as const satisfies {
  [G in keyof GameEvents]: G;
};

type GameEvent = keyof typeof EventTypes;

const isEventType = (event: unknown): event is GameEvent => {
  return typeof event === "string" && event in EventTypes;
};

export class GameSubscription extends EventEmitter<GameEvents> {
  private webSocket: WebSocket | null = null;

  constructor(gameId: string, connectionToken: string) {
    super();
    this.subscribe(gameId, connectionToken);
  }

  subscribe(gameId: string, connectionToken: string): void {
    if (this.webSocket) {
      return;
    }
    this.webSocket = new WebSocket(
      `ws://localhost:8080/ws?gameId=${gameId}&connectionToken=${connectionToken}`,
    );
    this.webSocket.addEventListener("open", () => {
      this.emit("connected");
    });
    this.webSocket.addEventListener("close", () => {
      this.emit("disconnected");
    });
    this.webSocket.addEventListener(
      "message",
      <T extends GameEvent>(event: MessageEvent) => {
        let parsed: { type: T; data: GameEvents[T] } | null = null;
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
    if (this.webSocket) {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.close();
      }
      if (this.webSocket.readyState === WebSocket.CONNECTING) {
        this.webSocket.addEventListener("open", () => {
          this.webSocket?.close();
        });
      }
    }
  }
}
export function getGameSubscription(
  gameId: string,
  connectionToken: string,
): GameSubscription {
  return new GameSubscription(gameId, connectionToken);
}
