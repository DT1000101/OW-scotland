"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Toggles the `admin-mode` class on <body> so the whole site shifts to the
// ops backdrop when an admin is signed in.
export default function AdminModeBody() {
  const { isAdmin } = useAuth();
  useEffect(() => {
    document.body.classList.toggle("admin-mode", isAdmin);
    return () => document.body.classList.remove("admin-mode");
  }, [isAdmin]);
  return null;
}
