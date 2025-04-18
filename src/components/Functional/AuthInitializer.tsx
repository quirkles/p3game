"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectSessionUser, setUser } from "@/store/slices/sessionUser";
import { User } from "@/types/User";
import { useAppSelector } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useDispatch();
  const sessionUser = useAppSelector(selectSessionUser);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("sessionUser");

      if (!sessionUser.id && userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage) as User));
      } else if (pathname === "/") {
        if (!sessionUser.id) {
          router.push("/user/create");
        } else {
          router.push("/games");
        }
      }
    }
  }, [dispatch, pathname, router, sessionUser.id]);

  return children;
}

export default AuthInitializer;
