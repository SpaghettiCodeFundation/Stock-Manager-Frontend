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
  useClientsQuery,
  useDeleteRecordsClientsMutation,
} from "@/hooks/clients.hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IQueryClients } from "@/api/clients.api";
import ItemTableClients from "./ItemTableClients";
import { IClient, IMeta } from "@/interfaces/clients.interface";
import AlertDelete from "../AlertDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import CreateClient from "./CreateClient";

const TableClients: React.FC = () => {
  const [query, setQuery] = useState<IQueryClients>({});
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [recordsClients, setRecordsClients] = useState<string[]>([]);

  const { data, isLoading } = useClientsQuery(query);
  const { mutate, isPending: isPendingDelete} = useDeleteRecordsClientsMutation();

  const handleQuery = (_query: IQueryClients) => {
    setQuery({
      ...query,
      ..._query,
    });
  };

  const handleNextPage = () => {
    const { current_page, last_page } = data?.meta as IMeta;

    if (current_page !== last_page) {
      setRecordsClients([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    const { current_page } = data?.meta as IMeta;

    if (current_page !== 1) {
      setRecordsClients([]);
      setDeleteAll(false);
      handleQuery({
        page: current_page - 1,
      });
    }
  };

  const handleSearch = (search: string) => {
    setRecordsClients([]);
    setDeleteAll(false);

    handleQuery({ search });
  };

  const handleDeleteRecordsClients = () => {
    setDeleteAll(false)
    setRecordsClients([])

    handleQuery({
      page: 1,
    });

    mutate(recordsClients);
  };

  useEffect(() => {
    if (!deleteAll) setRecordsClients([]);
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
            handleAction={handleDeleteRecordsClients}
            title="Are you sure you want to delete these clients?"
            description="Remember that all records related to these clients will also be deleted"
          >
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={recordsClients.length === 0}
              >
                {isPendingDelete? 'loading ...': 'Delete'}
              </Button>
            </AlertDialogTrigger>
          </AlertDelete>
          <CreateClient/>
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
            <TableHead>email</TableHead>
            <TableHead>phone</TableHead>
            <TableHead>address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.clients.map((item: IClient) => (
              <ItemTableClients
                key={item.id}
                item={item}
                checkDelete={deleteAll}
                setRecordsClients={(id: string) =>
                  setRecordsClients((prev) => [...prev, id])
                }
                removeRecordsClients={(id: string) =>
                  setRecordsClients(
                    recordsClients.filter((item) => item !== id)
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

export default TableClients;
