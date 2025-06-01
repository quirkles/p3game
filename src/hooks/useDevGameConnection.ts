import { useEffect, useRef, useState } from "react";
import {
  DevGameSubscription,
  getDevGameSubscription,
} from "@/subscribers/devGame";

interface IHookReturnProps {
  state: "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR";
  gameConnection: DevGameSubscription | null;
  reconnect: () => void;
}

export function useDevGameConnection(
  userId: string | null,
  gameId: string | null,
): IHookReturnProps {
  const conRef = useRef<DevGameSubscription | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const [connectionState, setConnectionState] = useState<
    "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR"
  >("ESTABLISHING_CONNECTION");

  useEffect(() => {
    if (!userId || !gameId) {
      return;
    }
    if (conRef.current && !isReconnecting) {
      return;
    }
    setConnectionState("ESTABLISHING_CONNECTION");
    let sub: DevGameSubscription | null = null;
    fetch(`http://localhost:8080/getToken?userId=${userId}&isDevToken=true`)
      .then((r) => r.json())
      .then(({ token }) => {
        setIsReconnecting(false);
        sub = getDevGameSubscription(gameId, token);
        if (conRef.current) {
          conRef.current.unsubscribe();
        }
        conRef.current = sub;

        sub.on("connected", () => {
          setConnectionState("CONNECTED");
        });
        sub.on("disconnected", () => {
          setConnectionState("DISCONNECTED");
        });
      })
      .catch((err) => {
        console.error("useGameConnection error", err);
        setConnectionState("ERROR");
      });
    return () => {
      conRef.current?.unsubscribe();
    };
  }, [gameId, isReconnecting, userId]);
  return {
    state: connectionState,
    gameConnection: conRef.current,
    reconnect: () => {
      setIsReconnecting(true);
    },
  };
}
