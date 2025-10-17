"use client";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "@bprogress/next";
import { useEffect } from "react";

export default function LoginPagesProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(session => {
      if (session.data != null) router.push("/products");
    })
  }, [router])
  return children
}