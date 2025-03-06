import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/Table";
import { Checkbox } from "../ui/checkbox";
import { IProduct } from "@/interfaces/products.interface";
import EditCategory from "./EditProduct";
import { Table } from "lucide-react";
import EditProduct from "../Products/EditProduct";


interface IProps {
  item: IProduct;
  checkDelete: boolean;
  setRecordsProducts: (id: number) => void;
  removeRecordsProducts: (id: number) => void;
}

const ItemTableProducts: React.FC<IProps> = ({
  item,
  checkDelete,
  setRecordsProducts,
  removeRecordsProducts,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(checkDelete);
  }, [checkDelete]);

  useEffect(() => {
    if (isDeleted) setRecordsProducts(item.id);
    if (!isDeleted) removeRecordsProducts(item.id);
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
        <EditProduct item={item}/>
      </TableCell>
    </TableRow>
  );
};

export default ItemTableProducts;
