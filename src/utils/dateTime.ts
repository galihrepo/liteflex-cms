import { Timestamp } from "firebase/firestore";

export function formatDateTimeHuman(timestamp: Timestamp): string {
  return timestamp.toDate().toLocaleString("id-ID", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
