import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  useProductsQuery,
  useDeleteRecordsProductsMutation,
} from "@/hooks/products.hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IQueryProducts } from "@/api/products.api";
import { IProduct, IMeta } from "@/interfaces/products.interface";
import AlertDelete from "../AlertDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import ItemTableProducts from "../Products/ItemTableProducts";

const TableProducts: React.FC = () => {
  const [query, setQuery] = useState<IQueryProducts>({ page: 1, search: "" });
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [recordsProducts, setRecordsProducts] = useState<number[]>([]);

  const { data, isLoading } = useProductsQuery(query);
  const { mutate, isPending: isPendingDelete } = useDeleteRecordsProductsMutation();

  useEffect(() => {
    if (!deleteAll) setRecordsProducts([]);
  }, [deleteAll]);

  const handleQuery = (newQuery: Partial<IQueryProducts>) => {
    setQuery((prev) => ({ ...prev, ...newQuery }));
  };

  const handlePagination = (nextPage: number) => {
    setRecordsProducts([]);
    setDeleteAll(false);
    handleQuery({ page: nextPage });
  };

  const handleDeleteRecordsProducts = () => {
    setDeleteAll(false);
    setRecordsProducts([]);
    handleQuery({ page: 1 });
    mutate(recordsProducts);
  };

  return (
    <div>
      <div className="lg:flex lg:justify-between mt-11 mb-6">
        <Input
          placeholder="Search product"
          className="lg:max-w-[450px]"
          onChange={(e) => handleQuery({ search: e.target.value })}
        />
        <div className="space-x-2 max-lg:mt-4 max-lg:flex max-lg:justify-end">
          <AlertDelete
            handleAction={handleDeleteRecordsProducts}
            title="Are you sure you want to delete these products?"
            description="Remember that all records related to these products will also be deleted"
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={recordsProducts.length === 0}>
                {isPendingDelete ? "Loading..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
          </AlertDelete>
          <Button>Create new product</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <label htmlFor="delete" className="flex items-center space-x-2">
                <Checkbox
                  id="delete"
                  checked={deleteAll}
                  onClick={() => setDeleteAll(!deleteAll)}
                />
                <p>Delete all</p>
              </label>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.products.map((item: IProduct) => (
              <ItemTableProducts
                key={item.id}
                item={item}
                checkDelete={deleteAll}
                setRecordsProducts={(id: number) =>
                  setRecordsProducts((prev) => [...prev, id])
                }
                removeRecordsProducts={(id: number) =>
                  setRecordsProducts((prev) => prev.filter((item) => item !== id))
                }
              />
            ))}
        </TableBody>
      </Table>

      {!isLoading && data?.meta && (
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() =>
                  data.meta.current_page > 1 && handlePagination(data.meta.current_page - 1)
                }
              />
            </PaginationItem>
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() =>
                  data.meta.current_page < data.meta.last_page &&
                  handlePagination(data.meta.current_page + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TableProducts;
