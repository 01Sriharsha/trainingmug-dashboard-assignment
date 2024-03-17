import { redirect } from "next/navigation";

export default function Saved() {
  if (true) {
    redirect("/saved/posts");
  }
  return <div>Saved Page</div>;
}
