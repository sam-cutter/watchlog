"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function RedirectPage() {
  // Define the searchParams in order to extract code
  const searchParams = useSearchParams();
  // Define router in order to redirect user to either their personal page or the login page
  const router = useRouter();

  async function authUserAndRedirect(
    providerName: string,
    code: string,
    codeVerifier: any,
    authRedirectUrl: string,
    redirectPath: string
  ) {
    // Authenticate the user with OAuth2
    await pb
      .collection("users")
      .authWithOAuth2(providerName, code, codeVerifier, authRedirectUrl);

    // Redirect the user to their own personal page
    try {
      redirect(redirectPath);
    } catch {
      router.push(redirectPath);
    }
  }

  useEffect(() => {
    // Extract the saved provider from local storage
    const provider = JSON.parse(localStorage.getItem("provider") || "{}");
    // Extract the code from the external authentication server
    const code = searchParams.get("code");
    // Extract the provider state from the search params
    const state = searchParams.get("state");

    // If either the provide or the code are null, redirect the user back to the login page
    if (!provider || !code || !state) redirect("/login");

    const providerName = provider.name;
    const codeVerifier = provider.codeVerifier;
    const providerState = provider.state;

    // If the provider name, the code verifier or the provider state are not present, redirect the user back to the login page
    if (!providerName || !codeVerifier || !providerState) redirect("/login");

    // If the state of the provider from local storage, and the state extracted from the URL don't match, redirect the buser back to the login page
    if (state != providerState) redirect("/login");
    else {
      const providerName = provider.name;
      const codeVerifier = provider.codeVerifier;
      const authRedirectUrl = "http://127.0.0.1:3000/redirect";
      const redirectPath = "/me";

      authUserAndRedirect(
        providerName,
        code || "",
        codeVerifier,
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
