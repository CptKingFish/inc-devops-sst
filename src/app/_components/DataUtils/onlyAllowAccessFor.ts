import { redirect } from "next/navigation";
import type { SystemRole } from "@prisma/client";

import { getServerAuthSession } from "@/server/auth";

const onlyAllowAccessFor = async (roles: (SystemRole | "all")[]) => {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/");
  if (roles.includes("all")) return session.user;
  if (!roles.includes(session.user.systemRole)) redirect("/");
  return session.user;
};

export default onlyAllowAccessFor;
