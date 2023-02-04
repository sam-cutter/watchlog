"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { pb } from "@/helpers/pocketbase";

export default function MePage() {
  const router = useRouter();
  useEffect(() => {
    if (!pb.authStore.isValid) router.push("/login");
  });

  if (pb.authStore.isValid) {
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
}
