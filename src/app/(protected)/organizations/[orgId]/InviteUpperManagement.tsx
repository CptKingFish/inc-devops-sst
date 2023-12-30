"use client";

import React from "react";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import type { Organization } from "@prisma/client";

import Modal from "@/app/_components/Modal";
import ReadExcel from "@/app/_components/ReadExcel";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { api } from "@/trpc/react";

type Props = { organization: Organization };

const InviteUpperManagement = ({ organization }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [emails, setEmails] = React.useState<string[]>([]);
  const router = useRouter();
  const inviteUpperManagement =
    api.organizations.inviteUpperManagement.useMutation({
      onSuccess: () => {
        setOpen(false);
        setEmails([]);
        toast.success("Invited upper management");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong");
      },
      onSettled: () => {
        router.refresh();
      },
    });
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <DialogTitle>
          Invite Upper Management into &quot;{organization.name}&quot;
        </DialogTitle>
        <ReadExcel setEmails={setEmails} />
        <p className="text-center text-sm text-gray-500">or</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inviteUpperManagement.mutate({
              emails: [email],
              orgId: organization.id,
            });
          }}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email of upper management to invite..."
          />
        </form>
        {emails.length !== 0 && (
          <ul className="list-inside list-disc">
            {emails.map((emailValue) => {
              return <li key={emailValue}>{emailValue}</li>;
            })}
          </ul>
        )}
        <Button
          isLoading={inviteUpperManagement.isLoading}
          onClick={() => {
            inviteUpperManagement.mutate({
              orgId: organization.id,
              emails: [...emails, email],
            });
          }}
        >
          Invite
        </Button>
      </Modal>
      <Button
        onClick={() => setOpen(true)}
        isLoading={inviteUpperManagement.isLoading}
      >
        Invite upper management into &quot;{organization.name}&quot;
      </Button>
    </>
  );
};

export default InviteUpperManagement;
