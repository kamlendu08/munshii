

import { getServerSession } from "next-auth";
import Dashboard from "./(root)/dashboard/page";
import Home from "./(root)/homepage/page";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import ProfilePage from "./(root)/profile/page";
const prisma = new PrismaClient();
export default async function Me() {
  // const { data: session, status } = useSession();
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Home />
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: session.user?.email ?? undefined },
    })
     // Always return true to allow sign in
     console.log(existingUser?.name);
    if(existingUser?.phone == null){
      return <ProfilePage/>
    }
  } catch (error) {
    console.error("Error in getting userdetail:", error)
    return false
  }
  return <Dashboard />;
}
