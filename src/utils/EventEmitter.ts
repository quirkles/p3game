type EventName = string;
export type EventHandlerArgsMap = Record<EventName, readonly unknown[]>;

type Handlers<
  Events extends EventHandlerArgsMap,
  EventName extends keyof Events & string = keyof Events & string,
> = {
  [E in EventName]?: ((...args: Events[E]) => void)[];
};

export class EventEmitter<
  Event_HandlerArgs_Map extends EventHandlerArgsMap,
  EventName extends keyof Event_HandlerArgs_Map &
    string = keyof Event_HandlerArgs_Map & string,
> {
  private readonly handlers: Handlers<Event_HandlerArgs_Map> = {};

  constructor() {}

  emit(
    ...[event, ...values]: EventName extends keyof Event_HandlerArgs_Map
      ? [EventName, ...Event_HandlerArgs_Map[EventName]]
      : never
  ): void {
    this.handlers[event]?.forEach((h) => h(...values));
  }

  on(
    ...[event, handler]: [
      EventName,
      (...args: Event_HandlerArgs_Map[EventName]) => void,
    ]
  ): () => void {
    if (!this.handlers[event]) {
      this.handlers[event] = [handler];
    } else {
      this.handlers[event].push(handler);
    }
    // Return the unsubscribe
    return () => {
      this.handlers[event] = this.handlers[event]?.filter((h) => h !== handler);
    };
  }
  registerHandlers(
    handlers: Record<
      EventName,
      (...args: Event_HandlerArgs_Map[EventName]) => void
    >,
  ): () => void {
    for (const eventName in handlers) {
      this.on(
        eventName as EventName,
        handlers[eventName] as (
          ...args: Event_HandlerArgs_Map[EventName]
        ) => void,
      );
    }
    return () => {};
  }
}
