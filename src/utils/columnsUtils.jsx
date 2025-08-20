import { Button } from "../components/ui/button.jsx";
import { Checkbox } from "../components/ui/checkbox.jsx";
import { ArrowUpDown } from "lucide-react";

export function createColumn({ accessorKey, header, cell }) {
  return {
    accessorKey: accessorKey,
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {header}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return cell ? (
        <>{cell(data)}</>
      ) : (
        <div title={row.getValue(accessorKey)} className="capitalize  pl-3">
          {(() => {
            const value = row.getValue(accessorKey);
            if (value === null || value === undefined) return "-";
            if (typeof value === "object") {
              return JSON.stringify(value);
            }
            return String(value);
          })()}
        </div>
      );
    },
  };
}

export function checkboxColumn() {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
