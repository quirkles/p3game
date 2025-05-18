export type EventHandlerArgsMap = {
  [eventName: string]: unknown;
};

type Handlers<
  Events extends EventHandlerArgsMap,
  EventName extends keyof Events & string = keyof Events & string,
> = {
  [E in EventName]?: ((payload: Events[E]) => void)[];
};

export class EventEmitter<
  Event_HandlerArgs_Map extends EventHandlerArgsMap,
  EventName extends keyof Event_HandlerArgs_Map &
    string = keyof Event_HandlerArgs_Map & string,
> {
  private readonly handlers: Handlers<Event_HandlerArgs_Map> = {};

  constructor() {}

  emit<T extends EventName>(
    event: Event_HandlerArgs_Map[T] extends void ? T : never,
  ): void;
  emit<T extends EventName>(
    event: Event_HandlerArgs_Map[T] extends void ? never : T,
    payload: Event_HandlerArgs_Map[T] extends void
      ? void
      : Event_HandlerArgs_Map[T],
  ): void;
  emit<T extends EventName>(
    event: Event_HandlerArgs_Map[T] extends void ? never : T,
    payload?: Event_HandlerArgs_Map[T] extends void
      ? void
      : Event_HandlerArgs_Map[T],
  ): void {
    this.handlers[event]?.forEach((h) =>
      h(
        payload as Event_HandlerArgs_Map[Event_HandlerArgs_Map[T] extends void
          ? never
          : T],
      ),
    );
  }

  on<T extends EventName>(
    event: T,
    handler: (payload: Event_HandlerArgs_Map[T]) => void,
  ): () => void {
    if (!this.handlers[event]) {
      this.handlers[event] = [handler];
    } else {
      this.handlers[event].push(handler);
    }
    // Return the unsubscriber function
    return () => {
      this.handlers[event] = this.handlers[event]?.filter((h) => h !== handler);
    };
  }
  registerHandlers(handlers: {
    [eventName in EventName]: (
      payload: Event_HandlerArgs_Map[eventName],
    ) => void;
  }): () => void {
    for (const eventName in handlers) {
      this.on(eventName, handlers[eventName]);
    }
    return () => {};
  }
  unsubscribeAll(): void {
    Object.keys(this.handlers).forEach((key) => {
      if (this.handlers[key]) {
        this.handlers[key as keyof Handlers<Event_HandlerArgs_Map>] = [];
      }
    });
  }
}
