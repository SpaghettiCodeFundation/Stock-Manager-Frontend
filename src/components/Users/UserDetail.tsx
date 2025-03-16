import React from 'react';
import { User } from 'src/interfaces/User.interface';

interface UserDetailProps {
  user: User;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  return (
    <div>
      {/* Detalles del usuario aquí */}
      <button className='text-white' onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default UserDetail;