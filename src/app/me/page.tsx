"use client";

import { useRouter, redirect } from "next/navigation";

import { pb } from "@/helpers/pocketbase";

export default function MePage() {
  const router = useRouter();

  if (!pb.authStore.isValid) redirect("/login");

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
