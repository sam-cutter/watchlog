"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const provider = JSON.parse(localStorage.getItem("provider") || "{}");
    if (!provider) router.push("/login");

    const code = searchParams.get("code");
    if (!code) router.push("/login");

    const providerName = provider.name;
    const codeVerifier = provider.codeVerifier;
    const redirectUrl = "http://127.0.0.1:3000/redirect";

    async function authUser() {
      await pb
        .collection("users")
        .authWithOAuth2(providerName, code || "", codeVerifier, redirectUrl);

      router.push("/me");
    }

    authUser();
  });

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
