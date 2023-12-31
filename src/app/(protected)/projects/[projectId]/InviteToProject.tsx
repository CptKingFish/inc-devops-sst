"use client";

import React from "react";
import { toast } from "sonner";
import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

import { DialogHeader } from "@/_components/ui/dialog";
import Modal from "@/app/_components/Modal";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { api } from "@/trpc/react";

type Props = { project: Project };

const InviteToProject = ({ project }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const inviteStakeholder = api.project.inviteStakeholder.useMutation({
    onSuccess: () => {
      toast.success("Invited Stakeholder");
      router.refresh();
      setEmail("");
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <DialogHeader>Invite Person</DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inviteStakeholder.mutate({
              email,
              projectId: project.id,
            });
          }}
        >
          <Input data-testid="invite-stakeholder-email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="h-4" />
          <Button data-testid="submit-btn" isLoading={inviteStakeholder.isLoading} type="submit">
            Invite
          </Button>
        </form>
      </Modal>
      <Button data-testid="invite-stakeholder-btn" onClick={() => setOpen(true)}>
        Invite stakeholder to Project
      </Button>
    </>
  );
};

export default InviteToProject;
