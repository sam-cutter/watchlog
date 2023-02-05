import { pb } from "@/helpers/pocketbase";
import LoginButton from "@/components/LoginButton";

import { redirect } from "next/navigation";

export default async function LoginPage() {
  if (pb.authStore.isValid) redirect("/me");

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
