"use client";

import type { AuthProviderInfo } from "pocketbase";
import Link from "next/link";

export default function LoginButton({
  provider,
  authRedirectUrl: redirectUrl,
}: {
  provider: AuthProviderInfo;
  authRedirectUrl: string;
}) {
  const authUrl = provider.authUrl + redirectUrl;

  return (
    <Link
      href={authUrl}
      onClick={() => {
        localStorage.setItem("provider", JSON.stringify(provider));
      }}
    >
      Log in with {provider.name}
    </Link>
  );
}
