import React, { useState } from 'react';
import { User, UserRole, UserStatus, UserFormProps } from '../../interfaces/User.interface';
const UserForm: React.FC<UserFormProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const [status, setStatus] = useState<UserStatus>(UserStatus.Active);

  const handleSubmit = () => {
    const newUser: User = {
      id: Date.now(),
      name,
      email: '', // Asegúrate de manejar el email correctamente
      role,
      status
    };
    onSave(newUser);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
        <option value={UserRole.Admin}>Admin</option>
        <option value={UserRole.User}>Usuario</option>
        <option value={UserRole.Moderador}>Moderador</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as UserStatus)}>
        <option value={UserStatus.Active}>Activo</option>
        <option value={UserStatus.Inactive}>Inactivo</option>
      </select>
      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default UserForm;