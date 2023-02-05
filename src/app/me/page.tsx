"use client";

import { useRouter, redirect } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function MePage() {
  if (!pb.authStore.isValid) redirect("/login");

  const router = useRouter();

  return (
    <div>
      <p>Logged in.</p>
      <button
        onClick={() => {
          pb.authStore.clear();
          router.push("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}
