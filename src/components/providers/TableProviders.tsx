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
} from "@/components/ui/table";
import {
  useProvidersQuery,
  useDeleteRecordsProvidersMutation,
} from "@/hooks/providers.hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IQueryProviders } from "@/api/providers.api";
import ItemTableProviders from "./ItemTableProviders";
import { IProvider, IMeta } from "@/interfaces/providers.interface";
import AlertDelete from "../AlertDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import CreateProvider from "../providers/CreateProvider";

const TableProviders: React.FC = () => {
  const [query, setQuery] = useState<IQueryProviders>({});
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [recordsProviders, setRecordsProviders] = useState<string[]>([]);

  const { data, isLoading } = useProvidersQuery(query);
  const { mutate, isPending: isPendingDelete} = useDeleteRecordsProvidersMutation();

  const handleQuery = (_query: IQueryProviders) => {
    setQuery({
      ...query,
      ..._query,
    });
  };

  const handleNextPage = () => {
    const { current_page, last_page } = data?.meta as IMeta;

    if (current_page !== last_page) {
      setRecordsProviders([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    const { current_page } = data?.meta as IMeta;

    if (current_page !== 1) {
      setRecordsProviders([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page - 1,
      });
    }
  };

  const handleSearch = (search: string) => {
    setRecordsProviders([]);
    setDeleteAll(false);

    handleQuery({ search });
  };

  const handleDeleteRecordsProviders = () => {
    setDeleteAll(false)
    setRecordsProviders([])

    handleQuery({
      page: 1,
    });

    mutate(recordsProviders);
  };

  useEffect(() => {
    if (!deleteAll) setRecordsProviders([]);
  }, [deleteAll]);

  return (
    <>
      <div className="lg:flex lg:justify-between mt-11 mb-6">
        <Input
          placeholder="Search category"
          className="lg:max-w-[450px]"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="space-x-2 max-lg:mt-4 max-lg:flex max-lg:justify-end">
          <AlertDelete
            handleAction={handleDeleteRecordsProviders}
            title="Are you sure you want to delete these providers?"
            description="Remember that all records related to these categories will also be deleted"
          >
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={recordsProviders.length === 0}
              >
                {isPendingDelete? 'loading ...': 'Delete'}
              </Button>
            </AlertDialogTrigger>
          </AlertDelete>
          <CreateProvider/>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <label htmlFor="delete" className="flex items-center space-x-2">
                <Checkbox
                  id="delete"
                  checked={deleteAll}
                  onClick={() => setDeleteAll(!deleteAll)}
                />
                <p>Delete</p>
              </label>
            </TableHead>
            <TableHead>name</TableHead>
            <TableHead>contact info</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.providers.map((item: IProvider) => (
              <ItemTableProviders
                key={item.id}
                item={item}
                checkDelete={deleteAll}
                setRecordsProviders={(id: string) =>
                  setRecordsProviders((prev) => [...prev, id])
                }
                removeRecordsProviders={(id: string) =>
                  setRecordsProviders(
                    recordsProviders.filter((item) => item !== id)
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
    </>
  );
};

export default TableProviders;
