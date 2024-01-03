import React from "react";

import { api } from "@/trpc/server";
import Table from "./table";

const AdminTable = async () => {
  const allAdmins = await api.admin.getAllAdminUsers.query();
  return <Table data-testid="admin-table" users={allAdmins} />;
};

export default AdminTable;
