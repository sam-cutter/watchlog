"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function authUserAndRedirect(
    providerName: string,
    code: string,
    codeVerifier: any,
    authRedirectUrl: string,
    redirectPath: string
  ) {
    await pb
      .collection("users")
      .authWithOAuth2(providerName, code, codeVerifier, authRedirectUrl);

    try {
      redirect(redirectPath);
    } catch {
      router.push(redirectPath);
    }
  }

  useEffect(() => {
    const provider = JSON.parse(localStorage.getItem("provider") || "{}");

    if (!provider) redirect("/login");

    const nameFromLocal = provider.name;
    const codeVerifierFromLocal = provider.codeVerifier;
    const stateFromLocal = provider.state;

    if (!nameFromLocal || !codeVerifierFromLocal || !stateFromLocal)
      redirect("/login");

    const codeFromUrl = searchParams.get("code");
    const stateFromUrl = searchParams.get("state");

    if (!codeFromUrl || !stateFromUrl) redirect("/login");

    if (stateFromUrl != stateFromLocal) redirect("/login");
    else {
      const authRedirectUrl = "http://127.0.0.1:3000/redirect";
      const redirectPath = "/me";

      authUserAndRedirect(
        nameFromLocal,
        codeFromUrl || "",
        codeVerifierFromLocal,
        authRedirectUrl,
        redirectPath
      );
    }
  });

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
