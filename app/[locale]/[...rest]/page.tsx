import { notFound } from "next/navigation";

/** Any unknown path inside a locale renders the branded 404. */
export default function CatchAllPage() {
  notFound();
}
