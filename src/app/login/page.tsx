import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";

import { pb } from "@/helpers/pocketbase";
import LoginButton from "@/components/LoginButton";

export default async function LoginPage() {
  const authCookie = getCookie("auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie.toString());

    if (!pb.authStore.isValid) redirect("/login");
  }

  const authRedirectUrl = "http://127.0.0.1:3000/redirect";

  const authProviders = (await pb.collection("users").listAuthMethods())
    .authProviders;

  return (
    <div>
      {authProviders?.map((provider) => {
        return (
          <LoginButton
            authRedirectUrl={authRedirectUrl}
            provider={provider}
            key={provider.name}
          />
        );
      })}
    </div>
  );
}
