import { useState } from "react";
import UserTable from '../components/Users/UserTable';
import UserFilters from '../components/Users/UserFilters';
import UserForm from '../components/Users/UserForm';
import UserDetail from '../components/Users/UserDetail';
import { User, UserRole, UserStatus } from '../interfaces/User.interface';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveUser = (user: User) => {
    setUsers(prev => [...prev, user]);
    setIsFormOpen(false);
  };

  const handleFilter = (search: string, role: UserRole | '', status: UserStatus | '') => {
    // Lógica para filtrar usuarios
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-11 pb-8 space-y-8">
        <h1 className="text-4xl">All users</h1>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <UserFilters onFilter={handleFilter} />

      <UserTable users={users} onSelectUser={setSelectedUser} />

      {isFormOpen && (
        <UserForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSaveUser} 
        />
      )}

      {selectedUser && (
        <UserDetail 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default UsersPage;