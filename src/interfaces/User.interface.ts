export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Moderador = 'Moderador',
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactivo',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserFormProps {
  user?: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

export interface UserDetailProps {
  user: User;
  onClose: () => void;
}

export interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export interface UserFiltersProps {
  onFilter: (search: string, role: UserRole | '', status: UserStatus | '') => void;
}