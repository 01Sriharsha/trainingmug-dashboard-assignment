import { redirect } from "next/navigation";

export default function Dashboard() {
  if (true) {
    redirect("/explore/posts");
  }
  return <div>hello</div>;
}
