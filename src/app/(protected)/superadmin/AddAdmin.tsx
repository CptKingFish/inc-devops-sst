"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Switch } from "@/_components/ui/switch";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { api } from "@/trpc/react";

const AddAdmin = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<"admin" | "superadmin">("admin");
  const [email, setEmail] = React.useState<string>("");
  const inviteAdmin = api.admin.inviteAdmin.useMutation({
    onSuccess: () => {
      setEmail("");
      setRole("admin");
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      console.error(error);
      toast.error(error.message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button data-testid="invite-admin-btn">Invite Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Admin</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite to be an admin.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inviteAdmin.mutate({ email, systemRole: role });
          }}
        >
          <Input data-testid="invite-admin-email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="h-4" />
          <div className="flex items-center justify-between">
            <Button data-testid="submit-btn" isLoading={inviteAdmin.isLoading} type="submit">
              Invite
            </Button>
            <div className="flex items-center gap-2 text-xs">
              <span>Admin</span>
              <Switch
                checked={role === "superadmin"}
                onCheckedChange={() => {
                  setRole(role === "admin" ? "superadmin" : "admin");
                }}
              />
              <span>Superadmin</span>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdmin;
