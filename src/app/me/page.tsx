"use client";

import { redirect, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

import { pb } from "@/helpers/pocketbase";

export default function MePage() {
  const authCookie = getCookie("auth");

  if (!authCookie) redirect("/login");

  pb.authStore.loadFromCookie(authCookie.toString());

  if (!pb.authStore.isValid) redirect("/login");

  const router = useRouter();

  return (
    <div>
      <p>Logged in.</p>
      <button
        onClick={() => {
          pb.authStore.clear();
          deleteCookie("auth");
          router.push("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
