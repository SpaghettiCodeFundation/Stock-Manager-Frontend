import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import {IProvider} from "@/interfaces/providers.interface";

interface IProps {
  item: IProvider;
  checkDelete: boolean;
  setRecordsProviders: (id: string) => void;
  removeRecordsProviders: (id: string) => void;
}

const ItemTableProviders: React.FC<IProps> = ({
  item,
  checkDelete,
  setRecordsProviders,
  removeRecordsProviders,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(checkDelete);
  }, [checkDelete]);

  useEffect(() => {
    if (isDeleted) setRecordsProviders(item.id as string);
    if (!isDeleted) removeRecordsProviders(item.id as string);
  }, [isDeleted]);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Checkbox
          checked={isDeleted}
          onClick={() => setIsDeleted(!isDeleted)}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.contactInfo}</TableCell>
      <TableCell className="text-right">
        edit
      </TableCell>
    </TableRow>
  );
};

export default ItemTableProviders;
