import PocketBase from "pocketbase";

export const pb = new PocketBase("http://localhost:8090");
export let currentUser = pb.authStore.model;

if (currentUser) {
  pb.authStore.onChange((auth) => {
    currentUser = pb.authStore.model;
  });
}
