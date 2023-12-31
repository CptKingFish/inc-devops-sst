import React from "react";
import Link from "next/link";

import { db } from "@/server/db";

const AllOrganizations = async () => {
  const allOrganization = await db.organization.findMany();
  return (
    <>
      <h1 className="text-xl font-medium">All Organizations</h1>
      <div className="h-4" />
      <div data-testid="all-organizations" className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {allOrganization.length === 0 && (
          <p data-testid="no-organization" className="text-gray-500">No organizations...</p>
        )}
        {allOrganization.map((organization) => {
          return (
            <Link data-testid={`organization-${organization.id}`}
              href={`/organizations/${organization.id}`}
              className="overflow-hidden rounded-lg border bg-white shadow transition hover:scale-105 hover:shadow-xl"
              key={organization.id}
            >
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="truncate text-lg font-medium">
                    {organization.name}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-500">
                    Created on {organization.createdAt.toLocaleDateString()}
                  </dd>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

const SuperAdminDashboard = async () => {
  return <AllOrganizations />;
};

export default SuperAdminDashboard;
