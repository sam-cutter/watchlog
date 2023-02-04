"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function authUser(
    providerName: string,
    code: string,
    codeVerifier: any,
    redirectUrl: string
  ) {
    await pb
      .collection("users")
      .authWithOAuth2(providerName, code || "", codeVerifier, redirectUrl);

    router.push("/me");
  }

  useEffect(() => {
    const provider = JSON.parse(localStorage.getItem("provider") || "{}");
    const code = searchParams.get("code");

    if (!provider || !code) router.push("/login");
    else {
      const providerName = provider.name;
      const codeVerifier = provider.codeVerifier;
      const redirectUrl = "http://127.0.0.1:3000/redirect";

      authUser(providerName, code, codeVerifier, redirectUrl);
    }
  });

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
