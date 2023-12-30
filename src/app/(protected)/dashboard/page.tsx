import { Suspense } from "react";

import { getServerAuthSession } from "@/server/auth";
// import { db } from "@/server/db";
import SuperAdminDashboard from "./SuperAdminDashboard";
import NormalUserDashboard from "./NormalUserDashboard";

export default async function Home() {
  const { user } = (await getServerAuthSession())!;
  return (
    <>
      {["superadmin", "admin"].includes(user.systemRole) && (
        <Suspense>
          <SuperAdminDashboard />
        </Suspense>
      )}
      {user.systemRole === "user" && (
        <Suspense>
          <NormalUserDashboard />
        </Suspense>
      )}
    </>
  );
}
