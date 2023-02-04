import { pb } from "@/helpers/pocketbase";

import LoginButton from "@/components/LoginButton";

export default async function LoginPage() {
  const redirectUrl = "http://127.0.0.1:3000/redirect";

  const authProviders = (await pb.collection("users").listAuthMethods())
    .authProviders;

  return (
    <div>
      {authProviders?.map((provider) => {
        return (
          <LoginButton
            redirectUrl={redirectUrl}
            provider={provider}
            key={provider.name}
          />
        );
      })}
    </div>
  );
}
