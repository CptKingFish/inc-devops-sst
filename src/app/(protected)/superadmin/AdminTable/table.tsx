"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/app/_components/data-table";
import type { RouterOutputs } from "@/trpc/shared";

type Props = {
  users: RouterOutputs["admin"]["getAllAdminUsers"];
};

const Table = ({ users }: Props) => {
  const columns: ColumnDef<RouterOutputs["admin"]["getAllAdminUsers"][0]>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "emailVerified",
      header: "Email Verified At",
    },
  ];
  return <DataTable data={users} columns={columns} />;
};

export default Table;
