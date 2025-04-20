export interface EventHandlerMap {
  [key: string]: (
    arg?: string | number | Record<string, string | number>,
  ) => void;
}

export class EventEmitter<T extends EventHandlerMap> {
  private readonly handlers: {
    [EventName in keyof T]?: T[EventName][];
  } = {};

  constructor() {}

  emit<K extends keyof T>(event: K, ...value: Parameters<T[K]>): void {
    this.handlers[event]?.forEach((h) => h(...value));
  }

  on<EventName extends keyof T>(
    event: EventName,
    handler: T[EventName],
  ): () => void {
    if (!this.handlers[event]) {
      this.handlers[event] = [handler];
    } else {
      this.handlers[event].push(handler);
    }
    return () => {
      this.handlers[event] = this.handlers[event]?.filter((h) => h !== handler);
    };
  }
}
