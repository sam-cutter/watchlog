import type { Record } from "pocketbase";

export default function Watchlog({ watchlog }: { watchlog: Record }) {
  return (
    <div>
      <h3>{watchlog.title}</h3>
      <p>{watchlog.description}</p>
    </div>
  );
}
