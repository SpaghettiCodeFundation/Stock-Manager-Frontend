import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { ICategory } from "@/interfaces/categories.interface";
import EditCategory from "./EditCategory";

interface IProps {
  item: ICategory;
  checkDelete: boolean;
  setRecordsCategories: (id: string) => void;
  removeRecordsCategories: (id: string) => void;
}

const ItemTableCategories: React.FC<IProps> = ({
  item,
  checkDelete,
  setRecordsCategories,
  removeRecordsCategories,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(checkDelete);
  }, [checkDelete]);

  useEffect(() => {
    if (isDeleted) setRecordsCategories(item.id as string);
    if (!isDeleted) removeRecordsCategories(item.id as string);
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
      <TableCell>{item.description}</TableCell>
      <TableCell className="text-right">
        <EditCategory item={item}/>
      </TableCell>
    </TableRow>
  );
};

export default ItemTableCategories;
