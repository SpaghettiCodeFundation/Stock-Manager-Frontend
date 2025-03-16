import React, { useState } from 'react';
import { UserRole, UserStatus } from 'src/interfaces/User.interface';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserFiltersProps {
  onFilter: (search: string, role: UserRole | '', status: UserStatus | '') => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [status, setStatus] = useState<UserStatus | ''>('');

  const handleFilter = () => {
    onFilter(search, role, status);
  };

  return (
<div className="flex items-center justify-end p-2">
<Input
        type="text"
        placeholder="Buscar por nombre o email"
        className="border p-2 rounded mr-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className="rounded-md p-2  mr-2 text-white" onChange={(e) => setRole(e.target.value as UserRole)}>
        <option className='text-white' value="">Todos los roles</option>
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
        <option value="guest">Invitado</option>
      </select>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='bg-black text-white'>Estados</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Estados</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={status === 'Active'}
            onCheckedChange={(checked) => setStatus(checked ? '' : '')}
          >
            Activo
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={status === 'Inactivo'}
            onCheckedChange={(checked) => setStatus(checked ? '' : '')}
          >
            Inactivo
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleFilter}>
        Filtrar
      </button>
    </div>
  );
};

export default UserFilters;