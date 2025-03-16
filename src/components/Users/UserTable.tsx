import React from 'react';
import { User } from 'src/interfaces/User.interface';
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import AlertDelete from "../AlertDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSelectUser }) => {
  const [deleteAll, setDeleteAll] = React.useState(false);
  const [isPendingDelete, setIsPendingDelete] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const handleQuery = (query: { search: string }) => {
    // Lógica para manejar la búsqueda
  };

  const handleDeleteUsers = () => {
    // Lógica para manejar la eliminación de usuarios
  };

  return (
    <div>
      <div className="lg:flex lg:justify-between mt-11 mb-6">
        
        
        <div className="space-x-2 max-lg:mt-4 max-lg:flex max-lg:justify-end">
          <AlertDelete
            handleAction={handleDeleteUsers}
            title="¿Estás seguro de que deseas eliminar estos usuarios?"
            description="Recuerda que todos los registros relacionados con estos usuarios también se eliminarán"
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={selectedUsers.length === 0}>
                {isPendingDelete ? "Cargando..." : "Eliminar"}
              </Button>
            </AlertDialogTrigger>
          </AlertDelete>
          <Button>Añadir usuario</Button>
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
                <p>Eliminar todos</p>
              </label>
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => onSelectUser(user)}>Ver Perfil</button>
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;