"use client";

import { useEffect } from "react";

/** Regista o service worker só em produção (em dev evita ficheiros antigos em cache). */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
