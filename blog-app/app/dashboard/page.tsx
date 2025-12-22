import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
    </div>
  );
}
