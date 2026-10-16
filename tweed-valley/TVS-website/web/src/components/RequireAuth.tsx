"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Wraps account/admin pages. Redirects to /login if signed out, and to the
// homepage if `admin` is required but the user isn't an admin.
export default function RequireAuth({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { loading, user, isAdmin, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!configured) return;
    if (!loading && !user) router.replace("/login");
    else if (!loading && admin && !isAdmin) router.replace("/");
  }, [loading, user, isAdmin, admin, configured, router]);

  if (!configured) {
    return (
      <div className="container-tvs py-20 text-center text-sand/60">
        Accounts are not connected yet. Add your Firebase keys to enable this
        area.
      </div>
    );
  }
  if (loading || !user || (admin && !isAdmin)) {
    return (
      <div className="container-tvs py-20 text-center text-sand/60">Loading…</div>
    );
  }
  return <>{children}</>;
}
