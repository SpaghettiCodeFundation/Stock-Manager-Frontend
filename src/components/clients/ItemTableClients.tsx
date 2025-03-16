import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import EditClient from "./EditClient";
import {IClient} from "@/interfaces/clients.interface";

interface IProps {
  item: IClient;
  checkDelete: boolean;
  setRecordsClients: (id: string) => void;
  removeRecordsClients: (id: string) => void;
}

const ItemTableCategories: React.FC<IProps> = ({
  item,
  checkDelete,
  setRecordsClients,
  removeRecordsClients,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(checkDelete);
  }, [checkDelete]);

  useEffect(() => {
    if (isDeleted) setRecordsClients(item.id as string);
    if (!isDeleted) removeRecordsClients(item.id as string);
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
      <TableCell className="break-all">{item.email}</TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell>{item.address}</TableCell>
      <TableCell className="text-right">
        <EditClient item={item}/>
      </TableCell>
    </TableRow>
  );
};

export default ItemTableCategories;
