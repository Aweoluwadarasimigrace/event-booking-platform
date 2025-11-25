"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login"); // redirect user
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
       <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
