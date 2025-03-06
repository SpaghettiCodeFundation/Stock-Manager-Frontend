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
  useCategoriesQuery,
  useDeleteRecordsCategoriesMutation,
} from "@/hooks/categories.hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IQueryCategories } from "@/api/categories.api";
import ItemTableCategories from "./ItemTableCategories";
import { ICategory, IMeta } from "@/interfaces/categories.interface";
import AlertDelete from "../AlertDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

const TableCategories: React.FC = () => {
  const [query, setQuery] = useState<IQueryCategories>({});
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [recordsCategories, setRecordsCategories] = useState<number[]>([]);

  const { data, isLoading } = useCategoriesQuery(query);
  const { mutate, isPending: isPendingDelete} = useDeleteRecordsCategoriesMutation();

  const handleQuery = (_query: IQueryCategories) => {
    setQuery({
      ...query,
      ..._query,
    });
  };

  const handleNextPage = () => {
    const { current_page, last_page } = data?.meta as IMeta;

    if (current_page !== last_page) {
      setRecordsCategories([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    const { current_page } = data?.meta as IMeta;

    if (current_page !== 1) {
      setRecordsCategories([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page - 1,
      });
    }
  };

  const handleSearch = (search: string) => {
    setRecordsCategories([]);
    setDeleteAll(false);

    handleQuery({ search });
  };

  const handleDeleteRecordsCategories = () => {
    setDeleteAll(false)
    setRecordsCategories([])

    handleQuery({
      page: 1,
    });

    mutate(recordsCategories);
  };

  useEffect(() => {
    if (!deleteAll) setRecordsCategories([]);
  }, [deleteAll]);

  return (
    <div>
      <div className="lg:flex lg:justify-between mt-11 mb-6">
        <Input
          placeholder="Search category"
          className="lg:max-w-[450px]"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="space-x-2 max-lg:mt-4 max-lg:flex max-lg:justify-end">
          <AlertDelete
            handleAction={handleDeleteRecordsCategories}
            title="Are you sure you want to delete these categories?"
            description="Remember that all records related to these categories will also be deleted"
          >
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={recordsCategories.length === 0}
              >
                {isPendingDelete? 'loading ...': 'Delete'}
              </Button>
            </AlertDialogTrigger>
          </AlertDelete>
          <Button>Create new category</Button>
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
            <TableHead>name</TableHead>
            <TableHead>description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.categories.map((item: ICategory) => (
              <ItemTableCategories
                key={item.id}
                item={item}
                checkDelete={deleteAll}
                setRecordsCategories={(id: number) =>
                  setRecordsCategories((prev) => [...prev, id])
                }
                removeRecordsCategories={(id: number) =>
                  setRecordsCategories(
                    recordsCategories.filter((item) => item !== id)
                  )
                }
              />
            ))}
        </TableBody>
      </Table>

      {!isLoading && (
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>

            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TableCategories;
