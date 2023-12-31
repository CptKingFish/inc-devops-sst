"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { api } from "@/trpc/react";

type Props = {
  orgId: string;
};

const CreateProject = ({ orgId }: Props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const createProject = api.organizations.createProject.useMutation({
    onSuccess: () => {
      setName("");
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
      <DialogTrigger asChild>
        <Button data-testid="create-new-project">Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createProject.mutate({ name, orgId });
          }}
        >
          <Input
            data-testid="new-project-name-input"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="h-4" />
          <div className="flex items-center justify-between">
            <Button data-testid="submit-btn" isLoading={createProject.isLoading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
