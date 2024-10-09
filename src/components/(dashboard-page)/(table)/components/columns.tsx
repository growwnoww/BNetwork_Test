"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { handleCopy, shortenAddress } from "@/helper";
import Image from "next/image";
import { LuCopy } from "react-icons/lu";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "image",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Current Planet"
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }: any) => (
      <div className="w-full flex items-center justify-center ">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="54"
          src="/Earth.png"
          width="54"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bn_id",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="BN ID"
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }: any) => (
      <div className="w-full flex items-center justify-center ">
        {row.getValue("bn_id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date_time",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Date&Time"
        className="w-fit ml-5"
      />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex w-fit  items-center  justify-center">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("date_time")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Believer Address"
        className="flex w-fit items-center justify-center"
      />
    ),
    cell: ({ row }: any) => (
      <div className="w-fit  flex items-center justify-center gap-x-3 ">
        <p>        {shortenAddress(row.getValue("address"))}</p>
        <p><LuCopy className="text-sm cursor-pointer hover:text-muted-foreground" onClick={()=>handleCopy(row.getValue("address"))}/></p>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "directTeam",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Direct Team"
        className="w-fit"
      />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center justify-center  w-16   ">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className=" truncate font-medium">
            {row.getValue("directTeam")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalTeam",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Total Team"
        className="w-fit"
      />
    ),
    cell: ({ row }: any) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center justify-center  w-16   ">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className=" truncate font-medium">
            {row.getValue("totalTeam")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
