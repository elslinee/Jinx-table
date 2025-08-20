/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./src/index.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./src/components/ui/dialog.jsx";
import { Button } from "./src/components/ui/button.jsx";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { JinxTable, createColumn } from "jinx-table";
const editDialog = (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="ml-auto cursor-pointer">
        Edit <PencilIcon />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">Save changes</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
const deleteDialog = (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" className="ml-auto cursor-pointer">
        Delete <TrashIcon />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">Save changes</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
const actionColumn = createColumn({
  accessorKey: "actions",
  header: "Actions",
  cell: (data) => (
    <div className="flex gap-2">
      {editDialog}
      {deleteDialog}
    </div>
  ),
});

function DevApp() {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`).then(
      (res) => {
        res
          .json()
          .then((json) => {
            const users = json.users;
            setKeys([
              {
                header: "id",
                cell: (row) => {
                  return (
                    <div className="capitalize text-red-600  pl-3">
                      {row.id}
                    </div>
                  );
                },
              },
              "firstName",
              "lastName",
              "email",
              "phone",
            ]);
            setData(users);
            setTotal(json.total);
            setSkip(json.skip);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  }, [skip]);
  const sorted = Object.fromEntries(
    Object.entries(keys).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );

  const dialog = (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto cursor-pointer">
          Add User <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-red-600 px-50">
      <JinxTable
        data={data}
        keys={keys}
        filterFields={["firstName", "lastName", "email", "phone", "id"]}
        newDataDialog={dialog}
        isCheckbox={true}
        isPagination={true}
        extraColumns={[actionColumn]}
        nextPage={() => setSkip(skip + limit)}
        previousPage={() => setSkip(skip - limit)}
        total={total}
        skip={skip}
        limit={limit}
        loading={loading}
      />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<DevApp />);
