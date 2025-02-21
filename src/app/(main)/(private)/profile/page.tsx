import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import ProfileTemplate from "@/components/ui/templates/ProfileTemplate";


export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="fade-enter">
      <ProfileTemplate session={session} />
    </div>
  );
}
